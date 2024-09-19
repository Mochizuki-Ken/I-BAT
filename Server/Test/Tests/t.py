
link="https://www.youtube.com/watch?v=xW6Sz-Cz9q0"
  
from pytube import YouTube


def download_360p_mp4_videos(url: str, outpath: str ):

    yt = YouTube(url)

    yt.streams.filter(file_extension="mp4").get_by_resolution("720p").download(outpath)#.get_by_resolution("720p")


if __name__ == "__main__":

    download_360p_mp4_videos(
        link,
        "C:/Users/ac000/Desktop/GAY",
    )