"""
This is the main entry point for the AI.
It defines the workflow graph and the entry point for the agent.
Here is the place we are going to store the state of the essay and modify the responses.
"""

from typing import TypedDict, Annotated
from langchain_groq import ChatGroq
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph.message import add_messages
import copilotkit


class AgentState(TypedDict):
    """Contains the state of the agent."""
    messages: Annotated[list,add_messages]
    essay: str

llm = ChatGroq(model="llama-3.3-70b-versatile")

def feedback_agent(state:AgentState):
    """The core funcationality of analyzing the feedback of the essay and providers"""
    feedback = copilotkit.analyze_essay(state["essay"])
    messages = state["messages"]+[{
        "role":"assistant",
        "content":feedback
    }]
    return {"messages":messages, "feedback":feedback}

workflow = StateGraph(AgentState)
workflow.add_node("feedback",feedback_agent)
workflow.set_entry_point("feedback")
workflow.add_edge("feedback",END)

memory = MemorySaver()

graph = workflow.compile(checkpointer = memory)

