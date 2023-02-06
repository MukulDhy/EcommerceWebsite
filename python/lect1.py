from PIL import Image,ImageFilter,ImageDraw

img  = Image.open("E:\clone\AmazonClone\python\space-planet-night-wallpaper-preview.jpg")

# r,g,b = img.split()
# img.show()

# img2 = Image.merge("RGB",(g,b,b))
# img2.show()

# img.filter(ImageFilter.GaussianBlur(5)).show()

# img.crop(1,2,300,300).show()

# img.transpose(Image.Transpose.FLIP_TOP_BOTTOM).show()

img2 = img.resize((400,400))
img2.show()