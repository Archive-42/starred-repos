#!/usr/local/bin/python
# -*- coding: utf-8 -*-
# @Time    : 2021/10/21 4:11 下午
# @File    : jd_city_cash.py
# @Project : scripts
# @Cron    : 0 1,18 * * *
# @Desc    : 城城领现金
import json
import math
import random
import asyncio
import aiohttp
from uuid import uuid5
from urllib.parse import urlencode
from utils.console import println
from utils.logger import logger
from utils.jd_init import jd_init
from config import USER_AGENT
from db.model import Code

CODE_KEY = 'jd_city_cash'
EARN_CODE_KEY = 'jd_city_earn_key'


def random_uuid():
    """
    :return:
    """
    s = '01234567890123456789abcdef'
    return 'a20' + ''.join(random.sample(s, 16)) + ''.join(random.sample(s, 21))


@jd_init
class JdCityCash:
    uuid = None

    headers = {
        'referer': 'https://bunearth.m.jd.com/',
        'user-agent': USER_AGENT,
        'content-type': 'application/x-www-form-urlencoded'
    }

    async def request(self, session, function_id, body=None, method='POST'):
        """
        请求数据
        :param function_id:
        :param body:
        :param method:
        :return:
        """
        try:
            if not body:
                body = {}
            if not self.uuid:
                self.uuid = random_uuid()
            params = {
                'functionId': function_id,
                'body': json.dumps(body),
                'client': 'wh5',
                'clientVersion': '1.0.0',
                'uuid': self.uuid
            }
            url = 'https://api.m.jd.com/client.action?' + urlencode(params)
            if method == 'GET':
                response = await session.get(url)
            else:
                response = await session.post(url)

            text = await response.text()

            data = json.loads(text)

            if data.get('code') == 0:
                return data.get('data', {'bizCode': 999})
            else:
                return {'bizCode': 999}

        except Exception as e:
            println('{}, 请求服务器数据失败, {}'.format(self.account, e.args))
            return {'bizCode': 999}

    async def get_home_data(self, session, body=None, invite_id='', task_channel='1'):
        """
        获取首页数据
        :param body:
        :param task_channel:
        :param session:
        :param invite_id:
        :return:
        """
        if not body:
            body = {"lbsCity": "", "realLbsCity": "", "inviteId": invite_id, "headImg": "", "userName": "",
                                   "taskChannel": task_channel}
        return await self.request(session, 'city_getHomeData', body)

    async def do_tasks(self, session, task_list):
        """
        做任务
        :param session:
        :param task_list:
        :return:
        """
        pass

    async def get_earn_cash_invite_id(self, session):
        """
        获取赚赏金邀请码
        :param session:
        :return:
        """
        data = await self.request(session, 'city_masterMainData')
        if data.get('bizCode') != 0:
            return None
        status = data.get('result', dict()).get('masterData', dict()).get('actStatus', 1)
        if status == 2:
            await self.receive_cash(session, cash_type=4)
        return data.get('result', dict()).get('masterData', dict()).get('inviteId', dict())

    async def run(self):
        """
        程序入口
        :return:
        """
        async with aiohttp.ClientSession(headers=self.headers, cookies=self.cookies) as session:
            data = await self.get_home_data(session)
            if data.get('bizCode') != 0:
                println('{}, 获取首页数据失败, 退出程序!'.format(self.account))
                return
            task_list = data.get('result', dict()).get('taskInfo', dict()).get('taskDetailResultVo', dict()).get('taskVos', list())
            await self.do_tasks(session, task_list)
            user_info = data.get('result', dict()).get('userActBaseInfo', dict())
            invite_id = user_info.get('inviteId', None)  # 邀请码
            if invite_id:
                println('{}, 邀请码:{}!'.format(self.account, invite_id))
                Code.insert_code(code_key=CODE_KEY, code_val=invite_id, account=self.account, sort=self.sort)

            earn_cash_invite_id = await self.get_earn_cash_invite_id(session)
            if earn_cash_invite_id:
                println('{}, 赚赏金邀请码:{}!'.format(self.account, earn_cash_invite_id))
                Code.insert_code(code_key=EARN_CODE_KEY, code_val=earn_cash_invite_id, account=self.account, sort=self.sort)

    async def receive_cash(self, session, cash_type=2, round_num=''):
        """
        领取赚赏金奖励
        :param cash_type:
        :param round_num:
        :param session:
        :return:
        """
        body = {"cashType": cash_type}
        if round_num:
            body['roundNum'] = round_num

        res = await self.request(session, 'city_receiveCash', body)
        if res.get('bizCode') == 0:
            println('{}, 当前可提现金额:{}!'.format(self.account, res.get('result', dict()).get('totalCash', 0.0)))

    async def get_award(self, session):
        """
        领取奖励
        :param session:
        :return:
        """
        data = await self.get_home_data(session)
        pop_windows_list = data.get('result', dict()).get('popWindows', list())

        for item in pop_windows_list:
            if item['type'] == 'dailycash_second':
                await self.receive_cash(session, round_num='')

        main_info_list = data.get('result', dict()).get('mainInfos', list())
        for item in main_info_list:
            if item.get('remaingAssistNum', -1) == 0 and item.get('status', '-1') == '1':
                await self.receive_cash(session, cash_type=1, round_num=item.get('roundNum', 1))

    async def run_help(self):
        """
        助力
        :return:
        """
        async with aiohttp.ClientSession(headers=self.headers, cookies=self.cookies) as session:
            data = await self.get_home_data(session)
            if data.get('bizCode') != 0:
                println('{}, 获取首页数据失败, 退出程序!'.format(self.account))
                return

            for code_key in [CODE_KEY, EARN_CODE_KEY]:
                item_list = Code.get_code_list(code_key)
                if self.sort < 1:
                    for item in item_list:
                        if item['account'] == '作者':
                            item_list.remove(item)
                            item_list.insert(0, item)
                for item in item_list:
                    account, code = item.get('account'), item.get('code')
                    if account == self.account:
                        continue
                    res = await self.get_home_data(session, invite_id=code)

                    result = res.get('result', dict()).get('toasts', '未知')

                    println('{}, 助力好友:{}, 结果:{}'.format(self.account, account, result))
                    try:
                        r = result[0]
                        if code_key == CODE_KEY and r['status'] == '3':
                            break

                        if code_key == EARN_CODE_KEY and r['status'] == '10':
                            break
                    except Exception as e:
                        pass

                    if res.get('bizCode') != 0:
                        break

            await self.get_award(session)


if __name__ == '__main__':
    from utils.process import process_start
    process_start(JdCityCash, name='城城领现金', code_key=[CODE_KEY, EARN_CODE_KEY], help=True)
