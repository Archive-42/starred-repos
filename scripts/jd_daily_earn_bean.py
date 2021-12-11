#!/usr/local/bin/python
# -*- coding: utf-8 -*-
# @Time    : 2021/10/14 1:56 下午
# @File    : jd_daily_earn_bean.py
# @Project : scripts
# @Cron    : 38 8,21 * * *
# @Desc    : 天天赚京豆

from utils.jd_common import JdCommon
from config import USER_AGENT

CODE_KEY = 'jd_daily_earn_bean'


class JdDailyEarnBean(JdCommon):
    """
    """
    code_key = CODE_KEY

    appid = "1E1xZy6s"

    # 请求头
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': 'https://h5.m.jd.com/babelDiy/Zeus/6Z5oyrCaX6U7cZw8eNKABiYKKXx/index.html',
        'User-Agent': USER_AGENT
    }


if __name__ == '__main__':
    from utils.process import process_start
    process_start(JdDailyEarnBean, '天天赚京豆', code_key=CODE_KEY)

