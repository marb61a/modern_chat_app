import express from "express";
import http from "http";
import socketIo from "socket.io";
import chalk from "chalk";

const isDevelopment = process.env.NODE_ENV !== "production";

// Setup
const app = express();
const server = new http.Server(app);
const io = socketIo(server);

// Configure Express
app.set("view engine", "jade");
app.use(express.static("public"));

const useExternalStyles = isDevelopment;
app.get("/", (req, res) => {
    res.render("index",{
       useExternalStyles 
    });
});