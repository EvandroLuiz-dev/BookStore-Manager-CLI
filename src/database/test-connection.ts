import pool from "./connection";

async function testConnection() {
  try {
    await pool.query("SELECT NOW()");
    console.log("Conexão com PostgreSQL realizada com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar com PostgreSQL:", error);
  } finally {
    await pool.end();
  }
}

testConnection();