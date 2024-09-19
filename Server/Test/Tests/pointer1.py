def tupian_add_noise_jiaoyan(a):
    image = np.array(bytearray(a), dtype="uint8")
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)

    s_vs_p = 0.5

    amount = 0.04
    noise_img = np.copy(image)

    num_salt = np.ceil(amount * image.size * s_vs_p)

    coords = [np.random.randint(0, i - 1, int(num_salt)) for i in image.shape]
    noise_img[coords] = 255

    num_pepper = np.ceil(amount * image.size * (1. - s_vs_p))

    coords = [np.random.randint(0, i - 1, int(num_pepper)) for i in image.shape]
    noise_img[coords] = 0
    img_encode = cv2.imencode('.jpg', noise_img)[1]
    data_encode = np.array(img_encode,dtype="uint8")
    return bytes(data_encode)
