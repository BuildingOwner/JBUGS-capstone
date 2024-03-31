import json
from jsonschema import validate, ValidationError
from json import JSONDecodeError


def json_validate(question):
    # JSON 형식 검증
    schema1 = {
        "type": "object",
        "properties": {
            "question": {"type": "string"},
            "options": {
                "type": "array",
                "items": {"type": "string"},
                "minItems": 4,
                "maxItems": 4,
            },
            "answer": {"type": "string"},
            "type": {"type": "string"},
        },
        "required": ["question", "options", "answer", "type"],
    }

    schema2 = {
        "type": "object",
        "properties": {
            "question": {"type": "string"},
            "answer": {"type": "string"},
            "type": {"type": "string"},
        },
        "required": ["question", "answer", "type"],
    }

    combined_schema = {"anyOf": [schema1, schema2]}

    validate(instance=json.loads(question), schema=combined_schema)
