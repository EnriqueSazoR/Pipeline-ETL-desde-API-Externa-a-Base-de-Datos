# Crypto ETL Pipeline – CoinGecko → PostgreSQL
## Descripción

Este proyecto implementa un pipeline ETL que extrae datos históricos de precios de criptomonedas desde la API pública de CoinGecko, los transforma y los carga de manera incremental en una base de datos PostgreSQL.

El sistema está diseñado siguiendo principios de ingeniería de datos:

- Separación de etapas (Extract, Transform, Load)
- Carga incremental
- Control de duplicados
- Logging de ejecución
- Automatización programada

## Flujo del sistema

- Extracción desde CoinGecko API
- Transformación y normalización de datos
- Carga incremental en PostgreSQL
- Registro de ejecución ETL
- Exposición de endpoints analíticos

## Tecnologías

- Node.js
- TypeScript
- PostgreSQL
- SQL
- node-cron

## Estrategia de carga incremental

La tabla etl_metadata almacena el último timestamp procesado.
El ETL solo inserta registros con timestamp mayor al último procesado.

Se utiliza ON CONFLICT para evitar duplicados.

## Próximas fases

- Implementación del módulo Extract
- Implementación del módulo Transform
- Implementación del módulo Load
- Automatización con scheduler
- Endpoints analítico# Pipeline-ETL-desde-API-Externa-a-Base-de-Datos
