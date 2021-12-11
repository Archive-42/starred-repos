#!/usr/local/bin/python
# -*- coding: utf-8 -*-
# @Time    : 2021/9/22 3:32 下午
# @File    : batch_run_js.py
# @Project : jd_scripts
# @Cron    : 40 0,8,12,18 * * *
# @Desc    : 批量执行JS脚本
import multiprocessing
import os
from config import JS_SCRIPTS_DIR, PROCESS_NUM, JD_COOKIES
from utils.cookie import export_cookie_env


def get_scripts():
    """
    获取需要运行的JS脚本列表
    :return:
    """
    res = []
    for js_file in os.listdir(JS_SCRIPTS_DIR):
        if js_file.endswith('.js') and 'Share' not in js_file:
            path = os.path.join(JS_SCRIPTS_DIR, js_file)
            if not os.path.exists(path):
                continue
            res.append(path)
    return res


def run(script_path):
    """
    :param script_path:
    :return:
    """
    script_dir, script_name = os.path.split(script_path)

    print('************开始执行脚本{}************'.format(script_name))
    print(script_dir, script_name)
    os.system(f'cd {script_dir};node {script_name};')
    print('************脚本:{}执行完毕***********'.format(script_name))


if __name__ == '__main__':
    export_cookie_env(JD_COOKIES)
    scripts = get_scripts()

    pool = multiprocessing.Pool(processes=PROCESS_NUM)  # 进程池
    for script in scripts:
        pool.apply_async(func=run, args=(script,))

    pool.close()
    pool.join()
