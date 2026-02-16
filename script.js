async function getWeather() {

    const location = document.getElementById("locationInput").value;
    const chatBox = document.getElementById("chat-box");

    chatBox.innerHTML += <div class="user-msg">You: ${location}</div>;

    const apiKey = "1556bb1739914a4da9724918261302";
    const url = https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if(data.error){
            chatBox.innerHTML += <div class="bot-msg">Bot: City not found ❌</div>;
            return;
        }

        const weatherMessage = `
            🌍 Location: ${data.location.name}, ${data.location.country} <br>
            🌡 Temp: ${data.current.temp_c}°C <br>
            💨 Wind: ${data.current.wind_kph} kph <br>
            💧 Humidity: ${data.current.humidity}% <br>
            🌥 Condition: ${data.current.condition.text}
        `;

        chatBox.innerHTML += <div class="bot-msg">Bot: ${weatherMessage}</div>;

    } catch (error) {
        chatBox.innerHTML += <div class="bot-msg">Bot: Error fetching weather ⚠</div>;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}
async function generateAIResponse(weatherData) {

    const prompt = `Explain this weather in friendly way:
    Temperature: ${weatherData.current.temp_c}°C,
    Condition: ${weatherData.current.condition.text},
    Wind: ${weatherData.current.wind_kph} kph`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_OPENAI_KEY"
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{role: "user", content: prompt}]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}