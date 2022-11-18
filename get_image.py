import asyncio
import aiohttp
import aiofiles
import string


async def get_image(session, pid_str):
    url = f"https://www.serebii.net/scarletviolet/pokemon/{pid_str}.png"
    file_name = f"image/{pid_str.replace('-', '')}.png"

    async with session.get(url) as resp:

        if resp.status != 200:
            return

        data = await resp.read()

        print(pid_str)

        f = await aiofiles.open(file_name, mode="wb")
        await f.write(data)
        await f.close()


async def main():
    async with aiohttp.ClientSession(
        connector=aiohttp.TCPConnector(ssl=False)
    ) as session:

        tasks = []
        for n in range(1, 1020):
            pid_str = str(n).zfill(3)
            tasks.append(asyncio.ensure_future(get_image(session, pid_str)))
            for w in list(string.ascii_lowercase):
                tasks.append(
                    asyncio.ensure_future(get_image(session, f"{pid_str}-{w}"))
                )

            if n % 50 == 0:
                await asyncio.sleep(1)
                await asyncio.gather(*tasks)
                tasks = []

        await asyncio.gather(*tasks)


asyncio.run(main())
