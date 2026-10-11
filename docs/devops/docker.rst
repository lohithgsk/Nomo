.. _devops_docker:

Docker Containerization
=======================

Nomo provides Docker configuration for containerized deployment.

Dockerfile Analysis
-------------------

The ``Dockerfile`` uses the lightweight Alpine Linux distribution of Nginx:

.. code-block:: dockerfile

   FROM nginx:alpine

   COPY apps/web /usr/share/nginx/html

   EXPOSE 80

* **Base Image:** ``nginx:alpine`` provides a fast web server with a minimal attack surface and small image footprint (~23 MB).
* **Static Asset Copy:** Ingests the entire ``apps/web`` tree directly into the default Nginx HTML root directory.
* **Port Exposure:** Exposes port 80 for HTTP traffic.

Docker Compose Specification (``docker-compose.yml``)
-----------------------------------------------------

.. code-block:: yaml

   services:
     web:
       build: .
       ports:
         - "8080:80"
       volumes:
         - ./apps/web:/usr/share/nginx/html:ro

* **Port Mapping (``8080:80``):** Exposes the application on port ``8080`` on the host machine.
* **Read-Only Volume Mount (``ro``):** Mounts ``./apps/web`` as a read-only volume into the container's static document root, enabling instant hot-reloading during development.

Commands
--------

.. code-block:: bash

   # Build and launch containers
   docker-compose up --build

   # Launch in background (detached mode)
   docker-compose up -d

   # Inspect container logs
   docker-compose logs -f web

   # Stop running containers
   docker-compose down
