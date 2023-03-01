const apiWeatherKey = "d4ef8187d8c31b8e1be50ed47e5476e8";
const apiImagensKey = "dNVv20CQhIkEhaXFtMwCYIbx9glUUlmYoGhvb5NEtVn88GQJAvSKYh8O"

const inputCidade = document.querySelector("#city-input");
const search = document.querySelector("#search");

const noemDaCidade = document.querySelector(".city-name h4");
const bandeira = document.querySelector(".city-name img");
const temperatura = document.querySelector(".temperatura h1");
const desqClima = document.querySelector(".ceu h4");
const simboloClima = document.querySelector(".ceu img");
const umidade = document.querySelector("#umidade");
const vento = document.querySelector("#vento");
const secaoDados = document.querySelector(".data");
const body = document.querySelector("body");
const sugestoes = document.querySelectorAll(".sugestoes div");

//FUNÇÕES

const getApiClima = async(cidade) => {
    const urlApiClima = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiWeatherKey}&lang=pt_br`;

    const response = await fetch(urlApiClima);
    const dados = await response.json();
    console.log(dados);
    exibirClima(dados);
}

const exibirClima = (dados) => {
    const cidadePesquisada = dados.name[0].toUpperCase() + dados.name.substring(1);
    console.log(cidadePesquisada);
    const fundo = `background-image: url(https://source.unsplash.com/800x600/?${cidadePesquisada});`

    secaoDados.style.display = "block";
    noemDaCidade.innerHTML = dados.name;
    bandeira.setAttribute("src", `https://flagsapi.com/${dados.sys.country}/flat/64.png`);
    temperatura.innerHTML = `${parseInt(dados.main.temp)}° C`;
    desqClima.innerHTML = dados.weather[0].description;
    simboloClima.setAttribute("src", `http://openweathermap.org/img/wn/${dados.weather[0].icon}.png`);
    umidade.innerHTML = `${dados.main.humidity} %`;
    vento.innerHTML = `${dados.wind.speed} km/h`;
    body.style.cssText = fundo;
}

//EVENTOS

search.addEventListener("click", (e) => {
    sugestoes[0].parentNode.style.display = "none";
    e.preventDefault();
    const cidade = inputCidade.value;
    getApiClima(cidade);
});

sugestoes.forEach((sugestao) => {
    sugestao.addEventListener('click', () => {
        sugestao.parentNode.style.display = "none";
        const cidade = sugestao.textContent;
        getApiClima(cidade);
    })
});