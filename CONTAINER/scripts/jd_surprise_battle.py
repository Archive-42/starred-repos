#!/usr/local/bin/python
# -*- coding: utf-8 -*-
# @Time    : 2021/8/15 上午11:47
# @Project : jd_scripts
# @File    : jd_surprise_battle.py
# @Cron    : 22 4,17 * * *
# @Desc    : 惊喜大作战
from utils.jd_common import JdCommon
from config import USER_AGENT

CODE_KEY = 'jd_surprise_battle'


class JdSurpriseBattle(JdCommon):
    """
    """
    code_key = CODE_KEY

    appid = "1FV1VwKc"

    # 请求头
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': 'https://h5.m.jd.com/',
        'User-Agent': USER_AGENT
    }


if __name__ == '__main__':
    from utils.process import process_start
    process_start(JdSurpriseBattle, '惊喜大作战', code_key=CODE_KEY)

    # from config import JD_COOKIES
    # import asyncio
    # app = JdCarLive(**JD_COOKIES[0])
    # asyncio.run(app.run())