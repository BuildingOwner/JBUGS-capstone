for y in range(2, 8):
    for x in range(2, 9, 3):
        if((x+y-2)%9 > 1):
            print(f"{(x+y-2)%9}, {y}")