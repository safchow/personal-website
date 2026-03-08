# Bruno API Collections

Bruno collections for testing the website backend API.

## Structure

```
bruno/
├── bruno.json              # Root collection config
├── environments/            # Bruno native environments
├── collections/             # API endpoint collections
│   └── events/             # Analytics events
└── README.md               # This file
```

## Setup

1. Install [Bruno](https://www.usebruno.com/) if you haven't already
2. **Create your local environment** (first time only):
   ```bash
   cp bruno/environments/local.bru.example bruno/environments/local.bru
   ```
   Edit `local.bru` and add your `admin_key` if you use `ADMIN_API_KEY` on the server.
3. Open Bruno and select "Open Collection"
4. Navigate to the `backend/bruno` folder
5. Select your environment from the dropdown (top-right in Bruno UI)

## Environments

- **local** - Local development (`http://localhost:8080`) - Copy from `local.bru.example`
- **production** - Production API (`https://api.safwaan-chowdhury.com`)

## Collections

### Events API

- **Get Events** - List analytics events from MongoDB (useful when Compass/Prisma Studio can't connect to Railway)
