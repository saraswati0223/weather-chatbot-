import streamlit as st
import requests

st.title("🌦 Weather Chatbot")

location = st.text_input("Enter City Name")

if st.button("Get Weather"):

    if location == "":
        st.warning("Please enter city name")
    else:
        api_key = "1556bb1739914a4da9724918261302"
        url = f"https://api.weatherapi.com/v1/current.json?key={api_key}&q={location}&aqi=yes"

        response = requests.get(url)
        data = response.json()

        if "error" in data:
            st.error("City not found ❌")
        else:
            st.subheader("📍 Weather Details")
            st.write("🌡 Temperature:", data["current"]["temp_c"], "°C")
            st.write("💨 Wind Speed:", data["current"]["wind_kph"], "kph")
            st.write("💧 Humidity:", data["current"]["humidity"], "%")
            st.write("🌥 Condition:", data["current"]["condition"]["text"])