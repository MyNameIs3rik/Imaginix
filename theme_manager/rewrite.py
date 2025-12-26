data = []

txt = "file8"
fol = "viking"
fil = "place"


x = ["mena","intro","weapon","defence","magic","wins","lose","place"]

for i,thing in enumerate(x):
    txt = "file" + str(i+1)
    data = []

    with open(f"theme_manager/adding/{thing}.txt", encoding="utf-8") as file:
        x = file.read()
        if ";" in x:
            y = x.split(";")
        else:
            y = x.split(",")

        for i,things in enumerate(y):
            y[i] = things.strip().replace("\n","")
        print("read the new names")



    with open(f"theme_manager/{fol}/en/{txt}.txt", "r", encoding="utf-8") as file:
        doc = file.read().split(";")
        print("read the old names")

    for things in y:
        if not things in doc:
            data.append(things)
    print("deleted reoccuring names")


    with open(f"theme_manager/{fol}/en/{txt}.txt", "a", encoding="utf-8") as file:
        for things in set(data):
            file.write(f"{things};\n")
        print("appendded the new names")

