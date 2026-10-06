from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select

class Item(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    description: str | None = Field(default=None, primary_key=False)


class FileUpload(Item):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    age: int | None = Field(default=None, index=True)
    secret_name: str

