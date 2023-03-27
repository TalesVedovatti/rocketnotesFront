import { Container, Links, Content } from "./styles.js"
import { Button } from "../../components/Button/index.jsx"
import { Header } from "../../components/Header/index.jsx"
import { Section } from "../../components/Section/index.jsx"
import { Tag } from "../../components/Tag/index.jsx"
import { ButtonText } from "../../components/ButtonText/index.jsx"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "../../services/api.js"


export function Details() {
  const [data, setData] = useState(null)


  const params = useParams();
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  } 

  async function handleRemove() {
    const confirm = window.confirm("Deseja realmente remover a nota?")

    if (confirm) {
      await api.delete(`/notes/${params.id}`);
      navigate(-1);
    }
  }

  useEffect(() => {
    async function fetchNote() {
      const response  = await api.get(`/notes/${params.id}`);
      setData(response.data)
    }

    fetchNote();
  }, [])

  return (
    <Container>
      <Header/>

      {
      data && <main>
        <Content>

          <ButtonText 
          title="Excluir nota"
          onClick={handleRemove}
          >
          </ButtonText>

          <h1>
            {data.title}
          </h1>
          <p>
            {data.description}
          </p>
          { data.links && <Section title="Links Úteis">
            <Links>
              {
                data.links.map(link => (
                  <li key={String(link.id)}>
                    <a href={link.url} target="_blank">{link.url}</a>
                  </li>
                ))
              }
              
            </Links>
          </Section>
          }


          {data.tags &&<Section title="Marcadores">
              {data.tags.map(tag => (

                <Tag 
                key={String(tag.id)}
                title={tag.name}
                ></Tag>
              ))}
          </Section>
          }
          <Button 
          title="Voltar"
          onClick={handleGoBack}
          >  
          </Button>
        </Content>
      </main>
      }
    </Container >
  )
}