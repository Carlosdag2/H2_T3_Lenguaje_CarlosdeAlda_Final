document.addEventListener("DOMContentLoaded", function() {
    // Obtener los elementos de filtro
    const genderSelect = document.getElementById('gender-select');
    const ageInput = document.getElementById('age-input');
    const applyFiltersBtn = document.getElementById('apply-filters-btn');

    // Escuchar el evento click en el botón de aplicar filtros
    applyFiltersBtn.addEventListener('click', filtrarResultados);

    function filtrarResultados() {
        // Limpiar los resultados anteriores
        const surveyResultsDiv = document.getElementById('survey-results');
        surveyResultsDiv.innerHTML = '';

        fetch('Respuestas_H2_T3_Lenguaje_CarlosdeAlda.json')
            .then(response => response.json())
            .then(data => {
                // Filtrar los datos según los filtros seleccionados
                const filteredData = data.filter(entry => {
                    const selectedGender = genderSelect.value;
                    const selectedAge = parseInt(ageInput.value);

                    const genderCondition = selectedGender === 'todos' || entry['Sexo'] === selectedGender;
                    const ageCondition = isNaN(selectedAge) || entry['Edad'] === selectedAge;

                    return genderCondition && ageCondition;
                });

                // Mostrar los resultados filtrados
                filteredData.forEach(entry => {
                    const resultEntry = document.createElement('div');
                    resultEntry.classList.add('card', 'my-2');

                    resultEntry.innerHTML = `
                        <div class="card-body">
                            <h5 class="card-title">Encuesta realizada el: ${entry['Marca temporal']}</h5>
                            <p class="card-text">Nombre: ${entry['Nombre']}</p>
                            <p class="card-text">Edad: ${entry['Edad']}</p>
                            <p class="card-text">Sexo: ${entry['Sexo']}</p>
                            <p class="card-text">Género Musical Favorito: ${entry['Género Musical Favorito:']}</p>
                            <p class="card-text">¿Con qué frecuencia escuchas música?: ${entry['¿Con qué frecuencia escuchas música?:']}</p>
                            <p class="card-text">¿Dónde prefieres escuchar música?: ${entry['¿Dónde prefieres escuchar música?:']}</p>
                            <p class="card-text">¿Cómo prefieres descubrir nueva música?: ${entry['¿Cómo prefieres descubrir nueva música?:']}</p>
                            <p class="card-text">¿Cuál es tu canción favorita en este momento?: ${entry['¿Cuál es tu canción favorita en este momento?']}</p>
                            <p class="card-text">¿Cuál es tu artista favorito en este momento?: ${entry['¿Cuál es tu artista favorito en este momento?']}</p>
                            <p class="card-text">¿Tocas algún instrumento musical?: ${entry['¿Tocas algún instrumento musical?']}</p>
                            <p class="card-text">¿Te gusta ir a conciertos en directo?: ${entry['¿Te gusta ir a conciertos en directo?']}</p>
                            <p class="card-text">¿En qué idioma sueles escuchar música?: ${entry['¿En qué idioma sueles escuchar música?']}</p>
                            <p class="card-text">¿Has ido alguna vez a un festival de música?: ${entry['¿Has ido alguna vez a un festival de música?']}</p>
                        </div>
                         `;

                    surveyResultsDiv.appendChild(resultEntry);
                });
            })
            .catch(error => console.error('Error al cargar los datos:', error));
    }
});
