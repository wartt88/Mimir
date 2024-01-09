import fitz

doc = fitz.open("rec.pdf")
output = ""
for page in doc:  # iterate the document pages
    text = page.get_text()
    output += text
print(output)
