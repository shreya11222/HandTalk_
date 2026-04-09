from transformers import T5Tokenizer, T5ForConditionalGeneration

model_path = "./sign_model"

tokenizer = T5Tokenizer.from_pretrained(model_path)
model = T5ForConditionalGeneration.from_pretrained(model_path)

def predict_gloss(text):
    input_text = "translate English to gloss: " + text

    inputs = tokenizer(input_text, return_tensors="pt")
    outputs = model.generate(**inputs)

    return tokenizer.decode(outputs[0], skip_special_tokens=True)