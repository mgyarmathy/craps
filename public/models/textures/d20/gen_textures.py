#!/usr/bin/python

from PIL import Image, ImageFont, ImageDraw


def main():
    fontfile = "/usr/share/fonts/truetype/msttcorefonts/arial.ttf"
    texts = [str(t) for t in range(1, 21)]
    size = (128, 128)
    for i, text in enumerate(texts):
        im = Image.new("L", size, "#FFFFFF")
        draw = ImageDraw.Draw(im)
        font = ImageFont.truetype(fontfile, 60)
        (width, height) = font.getsize(text)
        x = size[0] / 2 - width / 2
        y = size[1] - height
        draw.text((x, y), text, font=font, fill="#000000")
        if (text in ("6", "9")):
            # Draw additional "." after the text
            draw.text((x + width, y), ".", font=font, fill="#000000")
        im.save('%d.png' % (i + 1, ))

if __name__ == '__main__':
    main()
