import { Container } from "./styles";
import {Header} from "../../components/Header"
import { Form } from "./styles";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { Section } from "../../components/Section";
import { NoteItem } from "../../components/NoteItem";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from '../../services/api'
import { ButtonText } from "../../components/ButtonText";



export function New() {
    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState("");
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");   
    const navigate = useNavigate();
    
    function handleAddLink() {
        setLinks(prevState => [...prevState, newLink]);
        setNewLink("");
    }

    function handleRemoveLink(deleted) {
        setLinks(prevLinks => prevLinks.filter(link => link !== deleted))
    }

    function handleAddTag() {
        setTags(prevState => [...prevState, newTag]);
        setNewTag("");
    }

    function handleRemoveTag(deleted) {
        setTags(prevTags => prevTags.filter(tag => tag !== deleted))
    }

    function handleGoBack() {
        navigate(-1);
    } 

    async function handleNewNote() {
        if(!title) {
            return alert("Digite o título da nota.")
        }
        
        if(newTag) {
            return alert("Você deixou uma tag no campo para adicionar, mas não clicou para adicionar. Cliquei em + para adicionar ou deixe o campo vazio.")
        }
        if(newLink) {
            return alert("Você deixou um link no campo para adicionar, mas não clicou para adicionar. Cliquei em + para adicionar ou deixe o campo vazio.")
        }

        await api.post("/notes", {
            title,
            description,
            tags,
            links
        })

        alert("Nota cadastrada com sucesso!")
        navigate("/")
    }


    return(
        <Container>
            <Header/>

            <main>
                <Form>
                    <header>
                        <h1>Criar Nota</h1>
                        <ButtonText 
                        title="Voltar" 
                        onClick={handleGoBack}
                        />
                    </header>

                    <Input
                    placeholder="Título"
                    type="text"
                    onChange={e => setTitle(e.target.value)}
                    />

                    <Textarea 
                    placeholder="Observações" 
                    onChange={e => setDescription(e.target.value)}
                    />
                    <Section title="Links Úteis">
                        {
                            links.map((link, index) => (
                                <NoteItem
                                key={String(index)}  
                                value={link} 
                                onClick={()=> handleRemoveLink(link)}
                                />
                            ))
                        }
                        <NoteItem 
                        isNew 
                        placeholder="Novo link" 
                        value={newLink} 
                        onChange={e => setNewLink(e.target.value)} 
                        onClick={handleAddLink}
                        />
                    </Section>
                    <Section title="tags">
                        <div className="tags">
                            {
                                tags.map((tag, index) => (
                                    <NoteItem
                                    key={String(index)}  
                                    value={tag} 
                                    onClick={()=> handleRemoveTag(tag)}
                                    />
                                ))
                            }
                            <NoteItem 
                            isNew 
                            placeholder="Nova tag" 
                            value={newTag} 
                            onChange={e => setNewTag(e.target.value)} 
                            onClick={handleAddTag}
                            />
                        </div>
                    </Section>

                    <Button title="Salvar" onClick={handleNewNote}/>
                </Form>
            </main>
        </Container>
    )
}