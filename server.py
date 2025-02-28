from flask import Flask, render_template, request, redirect, jsonify
import json
import os

app = Flask(__name__)

JSON_FILE = "services.json"

# Cargar vehículos desde el JSON
def load_vehicles():
    if not os.path.exists(JSON_FILE):
        return []
    try:
        with open(JSON_FILE, "r", encoding="utf-8") as file:
            return json.load(file)
    except json.JSONDecodeError:
        return []

# Guardar vehículos en el JSON
def save_vehicles(data):
    with open(JSON_FILE, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=4, ensure_ascii=False)

# Página principal con CRUD visual
@app.route("/")
def home():
    vehicles = load_vehicles()
    return render_template("index.html", vehicles=vehicles)

# Ruta para agregar un nuevo vehículo
@app.route("/add", methods=["POST"])
def add_vehicle():
    imagen = request.form["imagen"]
    marca = request.form["marca"]
    modelo = request.form["modelo"]
    año = request.form["año"]
    codigos = request.form["codigos"].split(",")
    detalles = request.form["detalles"].split(",")

    new_vehicle = {
        "imagen": imagen,
        "marca": marca,
        "modelo": modelo,
        "año": año,
        "codigos": codigos,
        "detalles": detalles
    }

    vehicles = load_vehicles()
    vehicles.append(new_vehicle)
    save_vehicles(vehicles)

    return redirect("/")

# Ruta para eliminar un vehículo por índice
@app.route("/delete/<int:index>", methods=["GET"])
def delete_vehicle(index):
    vehicles = load_vehicles()
    if 0 <= index < len(vehicles):
        del vehicles[index]
        save_vehicles(vehicles)

    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)
