
import {FiPlus, FiSearch} from 'react-icons/fi'
import { Header } from "../../components/Header";
import { ButtonText } from "../../components/ButtonText";
import { Container, Brand, Menu, Search, Content, NewNote } from "./styles";
import { Input } from '../../components/Input';
import { Note } from '../../components/Note';
import { Section } from '../../components/Section';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';



export function Home() {
    const [tags, setTags] = useState([]);
    const [tagsSelected, setTagsSelected] = useState([]);
    const [search, setSearch] = useState("");
    const [notes, setNotes] = useState([]);

    const navigate = useNavigate();

    function handleTagSelected(tagName) {
        if (tagName === "all") {
            return setTagsSelected([])
        }
        
        if(tagsSelected.includes(tagName)) {
            setTagsSelected(prevState => prevState.filter(tag => tag !== tagName))
        }
        else {
            setTagsSelected([...tagsSelected, tagName])
        }

    }

    function handleDetails(id) {
        navigate(`/details/${id}`);
    }

    useEffect(() => {
        async function fetchTags() {
            const response = await api.get("/tags");
            setTags(response.data);
        } 

        fetchTags();
    },[])

    useEffect(() => {
        async function fetchNotes() {
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
            setNotes(response.data)
        }

        fetchNotes();
    }, [tagsSelected, search])

    return(
        <Container>
            <Brand>
                <h1>RocketNotes</h1>
            </Brand>

            <Header>

            </Header>

            <Menu>
                <li>
                    <ButtonText 
                    title={"Todos"}
                    onClick={() => handleTagSelected("all")}
                    isActive={tagsSelected.length === 0}
                    >
                    </ButtonText>
                </li>
                {
                    tags && tags.map(tag => (
                        <li key={String(tag.id)}>
                            <ButtonText 
                            title={tag.name}
                            onClick={() => handleTagSelected(tag.name)}
                            isActive={tagsSelected.includes(tag.name)}
                            />
                        </li>
                    ))
                }

            </Menu>

            <Search>
                <Input 
                placeholder="Pesquisar pelo título" 
                icon={FiSearch}
                onChange={e => setSearch(e.target.value)}
                />
            </Search>

            <Content>
                <Section title="Minhas notas">

                    {
                        notes.map(note => (
                            <Note
                            key={String(note.id)} 
                            data={note}
                            onClick={() => handleDetails(note.id)}
                            >
                            </Note>
                        ))
                    }
                    
                </Section>
            </Content>

            <NewNote to="/new">
                <FiPlus></FiPlus>
                Criar nota
            </NewNote>
        </Container>
    )
}