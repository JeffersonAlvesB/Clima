const containerClima = document.querySelector(".container_clima");
const containerGraus = document.querySelector(".container_graus");
const containerVentoHumidade = document.querySelector(
  ".container_humidade_vento"
);
const enviar = document.querySelector(".enviar");
const imagem = document.querySelector(".imagens");
const grau = document.querySelector(".grau");
const tipo = document.querySelector(".tipo");
const porcentagem = document.querySelector(".porcentagem");
const km = document.querySelector(".km");

async function Clima() {
  const pesquisa = document.querySelector(".pesquisa").value;

  if (!pesquisa) return;

  const API = `https://api.openweathermap.org/data/2.5/weather?q=${pesquisa}&units=metric&appid=0735a5d418d9aed0d10c261ef5232887&lang=pt_br`;

  try {
    const response = await fetch(API);
    const data = await response.json();
    ResultadoCerto(data);
  } catch (error) {
    ResultadoErrado();
  }
}

function ResultadoCerto(dados) {
  containerClima.classList.remove("Displays");
  switch (dados.weather[0].main) {
    case "Clear":
      imagem.src = "img/clear.png";
      document.body.style.backgroundImage = "url('img/sol.jpg')";
      break;
    case "Clouds":
      imagem.src = "img/cloud.png";
      document.body.style.backgroundImage = "url('img/nublado.jpg')";
      break;
    case "Mist":
      imagem.src = "img/mist.png";
      document.body.style.backgroundImage = "url('img/névoa.jpg')";
      break;
    case "Rain":
      imagem.src = "img/rain.png";
      document.body.style.backgroundImage = "url('img/chuva.jpg')";
      break;
    case "Snow":
      imagem.src = "img/snowflake.png";
      document.body.style.backgroundImage = "url('img/frio.jpg')";
      break;
    case "Thunderstorm":
      imagem.src = "img/rays.png";
      document.body.style.backgroundImage = "url(img/raios.jpg)";
      break;
    default:
      document.body.style.backgroundColor = "#0e021f";
      break;
  }

  grau.innerHTML = Math.round(dados.main.temp);
  tipo.innerHTML = dados.weather[0].description;
  porcentagem.innerHTML = Math.round(dados.main.humidity) + "%";
  km.innerHTML = Math.round(dados.wind.speed) + "Km/h";
}

function ResultadoErrado() {
  containerClima.classList.remove("Displays");
  containerGraus.classList.add("Displays");
  containerVentoHumidade.classList.add("Displays");
  imagem.src = "img/404.png";
  tipo.innerHTML = "ERRO, Tente Novamente!";
  setTimeout(() => {
    location.reload();
  }, 1500);
  return;
}

enviar.addEventListener("click", Clima);
