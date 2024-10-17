document.getElementById("buscar-ubs-btn").addEventListener("click", function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Faz uma requisição para a API de UBS passando latitude e longitude
            const radius = 5; // Raio de busca de 5 km (pode ajustar conforme necessário)
            const apiUrl = `https://api.saude.gov.br/ubs?lat=${latitude}&lng=${longitude}&radius=${radius}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const ubsList = document.getElementById("ubs-list");
                    ubsList.innerHTML = ""; // Limpa a lista antes de adicionar

                    if (data && data.length > 0) {
                        data.forEach(ubs => {
                            const listItem = document.createElement("li");
                            listItem.textContent = `${ubs.nome} - Endereço: ${ubs.endereco}, Distância: ${ubs.distancia} km`;
                            ubsList.appendChild(listItem);
                        });
                    } else {
                        ubsList.innerHTML = "<li>Nenhuma UBS encontrada nas proximidades.</li>";
                    }
                })
                .catch(error => {
                    console.error("Erro ao buscar UBS:", error);
                    document.getElementById("ubs-list").innerHTML = "<li>Erro ao buscar UBS.</li>";
                });
        }, function(error) {
            console.error("Erro ao obter localização:", error);
            document.getElementById("ubs-list").innerHTML = "<li>Erro ao obter sua localização.</li>";
        });
    } else {
        alert("Geolocalização não é suportada pelo seu navegador.");
    }
});

