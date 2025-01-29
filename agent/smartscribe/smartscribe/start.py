from fastapi import FastAPI
import uvicorn
from copilotkit import CopilotKitSDK, LangGraphAgent
from copilotkit.integrations.fastapi import add_fastapi_endpoint


app = FastAPI()
sdk = CopilotKitSDK(
    agents = [
        LangGraphAgent(
            name="Smart Scribe",
            description="A simple bot which can be helpful in writing essay by providing suggestion",
            graph = graph,
        )
    ],
)

add_fastapi_endpoint(app,sdk,"/copilotkit")

def main():
    """Running the uviocrn server."""
    port = "8080"
    uvicorn.run("smartscribe.start:app",host="0.0.0.0",port = port,reload=True)
