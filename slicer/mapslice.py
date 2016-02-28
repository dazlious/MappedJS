from PIL import Image
import math
import time
import argparse
import json


settings = None

json_data = {
   "images": []
}


def main():
    global settings
    try:
        settings = init_settings()

        start = time.time()

        img = open_image(settings.input)
        slices = calculate_slices(img, settings.size, settings.minsize)

        save_data_to_json(settings.output, slices, settings.path)

        slice_img(img, slices)

        result_rows = len(slices)
        result_cols = len(slices[0])
        result_number = result_cols * result_rows

        end = time.time()
        elapsed = end - start

        print("Sliced image into %dx%d and created %d tiles" % (result_cols, result_rows, result_number))
        print("-> Finished in: %.2fs" % round(elapsed, 2))
    except (KeyboardInterrupt, SystemExit):
        print "-> Aborted through user interaction"


def save_data_to_json(output, slices, path):
    for y in range(len(slices)):
        for x in range(len(slices[y])):
            current_slice = slices[y][x]
            data = {
                "path": path + "map_"+str(y)+"_"+str(x)+".jpg",
                "x": current_slice[0],
                "y": current_slice[1],
                "w": current_slice[2] - current_slice[0],
                "h": current_slice[3] - current_slice[1]
            }
            json_data["images"].append(data)

    with open(output + 'mapData.json', 'w') as f:
            json.dump(json_data, f)


def slice_img(image, slices):
    for y in range(len(slices)):
        for x in range(len(slices[y])):
            item = slices[y][x]
            crop_save(image, item, x, y)


def calculate_slices(image, size, minsize):
    width = image.width
    height = image.height

    x_remainder = width % size
    y_remainder = height % size

    x_too_small = False
    y_too_small = False

    if x_remainder < minsize:
        x_too_small = True
    if y_remainder < minsize:
        y_too_small = True

    return calculate_slices_normal(width, height, size, x_remainder, y_remainder, x_too_small, y_too_small)


def calculate_slices_normal(width, height, size, x_remainder, y_remainder, small_x, small_y):
    x_range = int(math.ceil(width / size))
    y_range = int(math.ceil(height / size))

    if not small_x:
        x_range += 1
    if not small_y:
        y_range += 1

    column_array = []

    for y in range(y_range):
        row_array = []
        for x in range(x_range):

            if small_x:
                w = size if x != x_range-1 else size + x_remainder
            else:
                if x == x_range - 1:
                    w = x_remainder
                else:
                    w = size

            if small_y:
                h = size if y != y_range-1 else size + y_remainder
            else:
                if y == y_range - 1:
                    h = y_remainder
                else:
                    h = size

            crop_box = (x * size, y * size, x * size + w, y * size + h)
            row_array.append(crop_box)
        column_array.append(row_array)
    return column_array


def crop_save(image, box, x, y):
    cropped_img = image.crop(box)
    cropped_img.save(settings.output + "map_"+str(y)+"_"+str(x)+".jpg")


def open_image(file_name) :
    try:
        img = Image.open(file_name)
        return img
    except Exception as e:
        print(str(e.message))
        return None


def init_settings():
    parser = argparse.ArgumentParser()

    parser.add_argument('-i', '--input', help='path to source', required=True, type=str)
    parser.add_argument('-o', '--output', help='path to destination', required=True, type=str)
    parser.add_argument('-s', '--size', help='size of a tile', default=512, type=int)
    parser.add_argument('-m', '--minsize', help='minimum size of a tile', default=128, type=int)
    parser.add_argument('-p', '--path', help='additional path information for relative paths', default="", type=str)

    args = parser.parse_args()

    if args.size <= args.minsize:
        raise IOError('Argument size needs to be greater than minsize')

    return args


if __name__ == "__main__":
    main()
