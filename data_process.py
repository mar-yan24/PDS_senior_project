def find_student(data, name):
    for student in data:
        if student["studentName"] == name:
            return student