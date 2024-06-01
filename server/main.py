import subprocess
from fastapi import FastAPI, Depends
from sqlalchemy import create_engine, Column, Integer, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = "sqlite:///./scripts.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
 
class CodeExecutionResult(Base):
    __tablename__ = "code_execution_results"
    id = Column(Integer, primary_key=True, index=True)
    code = Column(Text)
    output = Column(Text)
 
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
 
class CodeCreate(BaseModel):
    code: str
 
class ExecutionResponse(BaseModel):
    output: str

def checkDangerousKeywords(code: str) -> bool:
    dangerous_keywords = ["import", "os", "subprocess", "eval", "exec"]
    for keyword in dangerous_keywords:
        if keyword in code:
            return True
    return False

def execute_code(code: str) -> str:
    code_file_path = "code.py"
    with open(code_file_path, "w") as file:
        file.write(code)
    result = subprocess.run(["python", code_file_path], capture_output=True, text=True)
    return result
 
@app.post("/submit/", response_model=ExecutionResponse)
async def create_entry(code: CodeCreate, db: Session = Depends(get_db)):
    if checkDangerousKeywords(code.code):
        return ExecutionResponse(output="Dangerous Keywords Detected")
    result = execute_code(code.code)
    if result.stderr:
        return ExecutionResponse(output=result.stderr)
    db_result = CodeExecutionResult(code=code.code, output=result.stdout)
    db.add(db_result)
    db.commit()
    db.refresh(db_result)
    return ExecutionResponse(output="Success!")

@app.post("/test/", response_model=ExecutionResponse)
async def test_code(code: CodeCreate):
    if checkDangerousKeywords(code.code):
        return ExecutionResponse(output="Dangerous Keywords Detected")
    result = execute_code(code.code)
    if result.stderr:
        return ExecutionResponse(output=result.stderr)
    return ExecutionResponse(output=result.stdout)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)