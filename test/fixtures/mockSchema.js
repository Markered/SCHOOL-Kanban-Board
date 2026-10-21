const mockSchema = {
    "kanban1ID": {
        "title": "Kanban 1",
        "thumbnail": "https://example.com/kanban1-thumbnail.jpg",
        "columns": [
            {
                "id": 1,
                "title": "To Do",
                "tasks": [
                    { "id": 1, "title": "Task 1", "content": "Description for Task 1", "tag": "To Do", "priority": "High", "dueDate": "2024-06-30" }
                ]
            },
            {
                "id": 2,
                "title": "In Progress",
                "tasks": []
            }
        ]
    }
};

function getMockSchema() {
    return JSON.parse(JSON.stringify(mockSchema));
}

module.exports = {
    getMockSchema
};