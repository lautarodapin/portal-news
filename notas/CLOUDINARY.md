# Cuando se sube un string con tags de img y en src se tiene la data
```py
data = json.loads(request.body)
html = data.get("html")
data = re.compile('(data:image/(png|jpeg|jpg);base64,.*)">').findall(html)
data = cloudinary.uploader.upload(data[0][0])
resource = cloudinary.CloudinaryResource(
    public_id=data.get("public_id"),
    format=data.get("format"),
    version=data.get("version"),
    signature=data.get("signature"),
    url_options=data.get("url_options"),
    metadata=data.get("metadata"),
    type=data.get("type"),
    resource_type=data.get("resource_type"),
    default_resource_type=data.get("default_resource_type"),
)
Imagen.objects.create(imagen=resource)
```

### React
```js
 const parser = new DOMParser()
const doc = parser.parseFromString(e, 'text/html')
var img = doc.querySelector("img")
console.log(img.getAttribute("src"))
```