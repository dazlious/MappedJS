# USAGE:
# python mapslice.py -i image/src/germany.png -o image/dist/ger/ -p img/ -t 512 -s 512 -m 256
# python mapslice.py -i image/src/kartel-level-0.png image/src/kartel-level-1.png -o image/dist/multilevel/ -p img/ -t 512 -s 512 -m 256 -e png

from PIL import Image
import math
import time
import argparse
import json
import os

settings = None

last_image = None

json_data = {
   "img_data": {}
}


def main():
    global settings
    try:
        settings = init_settings()

        start = time.time()

        print settings.zoom

        for i in range(len(settings.input)):
            current_level = settings.input[i]
            build_level(current_level, settings.output, settings.path, settings.size, settings.minsize, i)

        end = time.time()
        elapsed = end - start

        with open(settings.output + 'mapData.json', 'w') as f:
            json.dump(json_data, f)

        print("-> Finished in: %.2fs" % round(elapsed, 2))
    except (KeyboardInterrupt, SystemExit):
        print "-> Aborted through user interaction"


def build_level(input_path, output, path, size, minsize, current_level):
    global last_image
    img = open_image(input_path)

    data_in_current_level = {
        "dimensions": {
            "width": img.width,
            "height": img.height
        },
        "tiles": []
    }

    if last_image is None:
        data_in_current_level["zoom"] = {
            "min": settings.zoom[0]
        }
    else:
        last_dimension = last_image["dimensions"]
        last_image["zoom"]["max"] = img.width / float(last_dimension["width"])

        data_in_current_level["zoom"] = {
            "min": float(last_dimension["width"]) / img.width
        }

    if current_level == (len(settings.input) - 1):
        data_in_current_level["zoom"]["max"] = settings.zoom[1]

    last_image = data_in_current_level

    slices = calculate_slices(img, size, minsize)

    if settings.clearfolder:
        os.system("rm -rf " + output)

    create_output_path(output)

    build_data_json(output, slices, path, data_in_current_level, current_level)

    slice_img(img, slices, current_level)

    create_thumb(img, data_in_current_level, path, current_level)

    result_rows = len(slices)
    result_cols = len(slices[0])
    result_number = result_cols * result_rows

    print("Sliced image for level %d into %dx%d and created %d tiles" % (current_level, result_cols, result_rows, result_number))


def create_thumb(img, data, path, current_level):
    outfile = "map_thumb_"+str(current_level)+"." + settings.extension
    thumb_img = img
    thumb_img.thumbnail((settings.thumbSize, settings.thumbSize), Image.ANTIALIAS)
    thumb_img.save(settings.output + outfile)
    data["thumb"] = path + outfile


def create_output_path(filename):
    if not os.path.exists(os.path.dirname(filename)):
        try:
            os.makedirs(os.path.dirname(filename))
        except OSError as exc:
            print(exc, exc.errno)
            if exc.errno != errno.EEXIST:
                raise


def build_data_json(output, slices, path, current_data, current_level):
    for y in range(len(slices)):
        for x in range(len(slices[y])):
            current_slice = slices[y][x]
            data = {
                "path": path + "map_"+str(current_level)+"_"+str(y)+"_"+str(x)+"." + settings.extension,
                "x": current_slice[0],
                "y": current_slice[1],
                "w": current_slice[2] - current_slice[0],
                "h": current_slice[3] - current_slice[1]
            }
            current_data["tiles"].append(data)

    json_data["img_data"]["level-" + str(current_level)] = current_data


def slice_img(image, slices, current_level):
    for y in range(len(slices)):
        for x in range(len(slices[y])):
            item = slices[y][x]
            crop_save(image, item, x, y, current_level)


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


def crop_save(image, box, x, y, current_level):
    cropped_img = image.crop(box)
    cropped_img.save(settings.output + "map_"+str(current_level)+"_"+str(y)+"_"+str(x)+"."+settings.extension)


def open_image(file_name):
    try:
        img = Image.open(file_name)
        return img
    except Exception as e:
        print(str(e.message))
        return None


def init_settings():
    parser = argparse.ArgumentParser()

    parser.add_argument('-i', '--input', help='path to source', required=True, type=str, nargs=argparse.ONE_OR_MORE)
    parser.add_argument('-o', '--output', help='path to destination', required=True, type=str)
    parser.add_argument('-s', '--size', help='size of a tile', default=512, type=int)
    parser.add_argument('-m', '--minsize', help='minimum size of a tile', default=128, type=int)
    parser.add_argument('-z', '--zoom', help='minimum and maximum zoom level', default=[0.5, 1.5], type=float, nargs=2)
    parser.add_argument('-t', '--thumbSize', help='size of thumbnail', default=256, type=int)
    parser.add_argument('-p', '--path', help='additional path information for relative paths', default="", type=str)
    parser.add_argument('-c', '--clearfolder', help='empties output folder', default=False, type=bool)
    parser.add_argument('-e', '--extension', help='file type', default="jpg", type=str)

    args = parser.parse_args()

    if args.size <= args.minsize:
        raise IOError('Argument size needs to be greater than minsize')

    return args


if __name__ == "__main__":
    main()
