import python_avatars as pa


def generate_avatar():
    for i in range(100):
        avatar = pa.Avatar.random(style=pa.AvatarStyle.TRANSPARENT)
        avatar.render(f"final/avatar/{i}.svg")
