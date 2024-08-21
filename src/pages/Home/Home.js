import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function Home() {

    const ClickCadastro = () => {
        var newForm = document.getElementById("div-4");
        newForm.style.display = "block";
        var button = document.getElementById("newText");
        var buttonEdit = document.getElementById("editNews");
        buttonEdit.style.display = "none";
        button.style.display = "none";
    }

    const {register, handleSubmit} = useForm();
    const onSubmit = (e) => {
        const formNews = document.getElementById('formNews');
        const formData = new FormData(formNews);

        const newsData = {
            name: formData.get('name'),
            email: formData.get('email'),
            tel: formData.get('tel'),
            wp: formData.get('wp'),
        };

        addNews(newsData)
            .then(() => {
                formNews.reset();
            })
            .catch(error => {
                console.error('Algo deu errado...:', error);
            });
    }

    function addNews(newsData) {
        return fetch('https://projeto-ii-c500a-default-rtdb.firebaseio.com/news.json', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newsData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Resposta de rede não foi ok');
            } else {
                alert("Tudo certo " + newsData.name + "! Em breve você receberá uma mensagem no endereço de email " + newsData.email + "!");
            }
        });
    }

    return (
        <>
        <div style={{display: 'grid'}}>

        <div id="carousel" class="carousel slide">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" class="active" aria-current="true"
                    aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <a href="../Produtos/produtos.html">
                        <img
                        src="https://www.waverlyclt.com/wp-content/uploads/2022/07/Waverly-94_header-1200x480.jpg"
                        class="d-block w-100"
                        alt=''
                        />

                    </a>
                    <div class="carousel-caption d-none d-md-block">
                        <h3 style={{fontWeight:'bold',}}>Roupas feitas exclusivamente pra você!</h3>
                        <h5 style={{fontWeight:'bold',}}>Trabalhamos com as melhores marcas e materiais, para que você
                            tenha a certeza de estar vestindo algo que
                            vai durar.</h5>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="https://gowhere.com.br/wp-content/uploads/2021/06/Design-sem-nome-15-1200x480.png"
                        class="d-block w-100" alt="..."/>
                    <div class="carousel-caption d-none d-md-block">
                        <h3 style={{fontWeight:'bold',}}>Roupas feitas exclusivamente pra você!</h3>
                        <h5 style={{fontWeight:'bold',}}>Trabalhamos com as melhores marcas e materiais, para que você
                            tenha a certeza de estar vestindo algo que
                            vai durar.</h5>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="https://welcomecenter.com.br/wp-content/uploads/2018/08/jeans-destroyed-1-1200x480.jpg"
                        class="d-block w-100" alt="..."/>
                    <div class="carousel-caption d-none d-md-block">
                        <h3 style={{fontWeight:'bold',}}>Roupas feitas exclusivamente pra você!</h3>
                        <h5 style={{fontWeight:'bold',}}>Trabalhamos com as melhores marcas e materiais, para que você
                            tenha a certeza de estar vestindo algo que
                            vai durar.</h5>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Anterior</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Próximo</span>
            </button>
        </div>
    </div>

    <div id="div-1">
        <div id="text-context">
            <h1>Estilo para todos os gostos!</h1>
            <p>
                Do casual ao elegante, do básico ao trendy, temos peças para todos os estilos e ocasiões. <br></br>
                Trabalhamos com as melhores marcas e materiais, para que você tenha a certeza de estar vestindo algo que
                vai durar. <br></br>
                Acreditamos que moda deve ser acessível para todos, por isso oferecemos preços competitivos e justos.
            </p>
        </div>
        <div id="context">
            <img src="https://t.ctcdn.com.br/pECdk91a25YudQ8xpbj-VVQuIi4=/640x360/smart/i13889.png" alt=""/>
        </div>
    </div>

    <div id="div-2">
        <div id="div-2-1">
            <h1 id="title-1">Conheça nossa nova coleção exclusiva!</h1>
            <a href="../Produtos/produtos.html"><button id="more">Saiba Mais!</button></a>
        </div>
        <div id="div-2-2">
            <img src= "https://t.ctcdn.com.br/pECdk91a25YudQ8xpbj-VVQuIi4=/640x360/smart/i13889.png" alt=""/>
            <img src="https://welcomecenter.com.br/wp-content/uploads/2018/08/jeans-destroyed-1-1200x480.jpg" alt=""/>
        </div>
    </div>
    <div id="div-3">
        <h1>Quer ficar por dentro de todas as nossas novidades assim que elas chegarem?</h1>
        <h3>Cadastre-se e receba as melhores ofertas.</h3>
            <div id="div-4">
                <form action="" id="formNews" onSubmit={handleSubmit(onSubmit)}>
                    <label for="name">Nome</label><br/>
                    <input type="text" required id="name" name="name"/><br/>

                    <label for="email">Email</label><br/>
                    <input type="email" required id="email" name="email"/><br/>

                    <label for="fone">Telefone</label><br/>
                    <input type="tel" id="tel" name="tel"/><br/>

                    <label for="wp">WhatsApp</label><br/>
                    <input type="tel" required id="wp" name="wp"/><br/>

                    <button type="submit" class="btn btn-primary btn-lg" style={{marginLeft: 0}}
                        id="submit">Receber</button>
                    <a href="../Cadastro/index.html"><button type="button" class="btn btn-success btn-lg"
                            id="createAccount">Criar conta completa</button></a>

                </form>
            </div>

        <button type="button" class="btn btn-primary btn-lg" id="newText" onClick={ClickCadastro}>Cadastre-se</button>
        <a href="../Login/login.html"><button type="button" class="btn btn-primary btn-lg" id="editNews">Já tenho cadastro</button></a>

        <div id="div-5">
            <form action="" id="formNewsEdit">

                <label for="email-consult">Email</label><br/>
                <input type="email" required id="email-consult" name="email"/><br/>

                <button type="submit" class="btn btn-primary btn-lg" style={{marginLeft: 0}}
                    id="submit-consult">Consultar</button>
                <button type="submit" class="btn btn-warning btn-lg" style={{marginLeft: 0}}
                    id="editButton">Editar</button>
                <button type="submit" class="btn btn-danger btn-lg" style={{marginLeft: 0}}
                    id="deleteBottun">Deletar</button>
            </form>
        </div>
    </div>
    </>
    )
}