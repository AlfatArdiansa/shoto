<image src="public/img.png" />
<div align="center">

**ショート** _(Shōto)_ | A simple URL shortener deployed instantly on your server

</div>

---

### Requirement

- Docker & Docker compose plugin

### Installation

- Clone repository

```bash
git clone https://github.com/AlfatArdiansa/shoto.git
```

- Create a `data` directory with user and group `1001`

```bash
mkdir data
chown -R 1001:1001 data
```

- Run the app with docker compose

```bash
docker compose up -d
```

- Set your configuration at `data/config.json`
