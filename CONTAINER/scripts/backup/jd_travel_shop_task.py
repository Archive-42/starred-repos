#!/usr/local/bin/python
# -*- coding: utf-8 -*-
# @Time    : 2021/10/21 6:05 下午
# @File    : jd_travel_shop_task.py
# @Project : scripts
# @Cron    : 45 3,8 * * *
# @Desc    : 热爱环游记下方店铺任务
import asyncio
import json
import random
import time
from copy import deepcopy
import aiohttp
from urllib.parse import urlencode, quote

import math

from config import USER_AGENT
from utils.jd_init import jd_init
from utils.console import println
from utils.logger import logger
from db.model import Code
from furl import furl

CODE_KEY_BASE = 'jd_travels_shop_'


def random_string(e=40):
    """
    生成随机字符串
    :param e:
    :return:
    """
    t = "abcdefhijkmnprstwxyz123456789"
    len_ = len(t)
    s = ""
    for i in range(e):
        s += t[math.floor(random.random() * len_)]
    return s


@jd_init
class JdTravelShopTask:
    headers = {
        'referer': 'https://bunearth.m.jd.com/',
        'user-agent': USER_AGENT,
        'content-type': 'application/x-www-form-urlencoded'
    }

    code_key_list = []

    @logger.catch
    async def request(self, session, function_id, body=None, method='POST'):
        """
        请求数据
        :param session:
        :param function_id:
        :param body:
        :param method:
        :return:
        """
        try:
            if not body:
                body = {}
            params = {
                'functionId': function_id,
                'body': json.dumps(body),
                'client': 'wh5',
                'clientVersion': '1.0.0',
            }
            url = 'https://api.m.jd.com/client.action?' + urlencode(params)
            if method == 'GET':
                response = await session.get(url)
            else:
                response = await session.post(url)

            text = await response.text()

            data = json.loads(text)
            return data.get('data', {})
        except Exception as e:
            return {}

    @logger.catch
    async def requestx(self, session, function_id, body=None, method='POST'):
        """
        请求数据
        :param session:
        :param function_id:
        :param body:
        :param method:
        :return:
        """
        try:
            if not body:
                body = {}
            params = {
                'functionId': function_id,
                'body': json.dumps(body),
                'client': 'wh5',
                'clientVersion': '10.0.0',
                't': int(time.time() * 1000),
                'appid': 'shop_view',
                'eid': '',
                'uuid': random_string(40)
            }
            url = 'https://api.m.jd.com/client.action?' + urlencode(params)
            if method == 'GET':
                response = await session.get(url)
            else:
                response = await session.post(url)

            text = await response.text()

            data = json.loads(text)
            return data.get('data', {})
        except Exception as e:
            println(e.args)
            return {}

    @logger.catch
    async def get_shop_list(self, session):
        """
        获取店铺列表
        :param session:
        :return:
        """
        try:
            params = {
                'functionId': 'qryCompositeMaterials',
                'body': {
                    "qryParam": "[{\"type\":\"advertGroup\",\"mapTo\":\"babelCountDownFromAdv\",\"id\":\"05884370\"},"
                                "{\"type\":\"advertGroup\",\"mapTo\":\"feedBannerT\",\"id\":\"05860672\"},"
                                "{\"type\":\"advertGroup\",\"mapTo\":\"feedBannerS\",\"id\":\"05861001\"},"
                                "{\"type\":\"advertGroup\",\"mapTo\":\"feedBannerA\",\"id\":\"05861003\"},"
                                "{\"type\":\"advertGroup\",\"mapTo\":\"feedBannerB\",\"id\":\"05861004\"},"
                                "{\"type\":\"advertGroup\",\"mapTo\":\"feedBottomHeadPic\",\"id\":\"05872092\"},"
                                "{\"type\":\"advertGroup\",\"mapTo\":\"feedBottomData0\",\"id\":\"05908556\"},"
                                "{\"type\":\"advertGroup\",\"mapTo\":\"fissionData\",\"id\":\"05863777\"},"
                                "{\"type\":\"advertGroup\",\"mapTo\":\"newProds\",\"id\":\"05864483\"}]",
                    "activityId": "2vVU4E7JLH9gKYfLQ5EVW6eN2P7B", "pageId": "", "reqSrc": "", "applyKey": "jd_star"},
                'client': 'wh5',
                'clientVersion': '1.0.0',
                'uuid': 'a20a584859ecbfbe14d1c986aa3456a3b46c3b36'
            }
            url = 'https://api.m.jd.com/client.action?' + urlencode(params)
            response = await session.post(url)
            text = await response.text()
            data = json.loads(text)
            if data.get('code') != '0':
                return []
            item_list = data.get('data', dict()).get('feedBottomData0', dict()).get('list', list())
            shop_list = []

            for item in item_list:
                shop_list.append({
                    'shopId': item['link'],
                    'venderId': item['extension']['shopInfo']['venderId']
                })

            return shop_list
        except Exception:
            return []

    @logger.catch
    async def do_task(self, session, shop, task):
        """
        """
        params = deepcopy(shop)
        params['taskId'] = task['id']
        params['token'] = task['token']
        params['opType'] = 1
        await self.requestx(session, 'jm_task_process', params)
        println('{}, 正在做任务:{}, 等待5s！'.format(self.account, task.get('name', '未知')))
        await asyncio.sleep(5)
        params['opType'] = 2
        res = await self.requestx(session, 'jm_task_process', params)
        if res:
            println('{}, 获得奖励:{}'.format(self.account, res.get('awardVO', dict()).get('name', '未知')))

    @logger.catch
    async def do_shop_tasks(self, session, shop):
        """
        做店鋪任務
        """
        res = await self.requestx(session, 'jm_marketing_maininfo', shop)
        task_list = res.get('project', dict()).get('viewTaskVOS', list())
        shop_name = res.get('shopInfoVO', dict()).get('shopName', None)
        if not shop_name:
            return

        println('{}, 正在做店铺:《{}》的任务!'.format(self.account, shop_name))

        await asyncio.sleep(1)
        await self.requestx(session, 'followShop',
                            {"shopId": shop['shopId'], "follow": True, "type": 0, "sourceRpc": "shop_app_myfollows_shop",
                             "refer": "https://wq.jd.com/pages/index/index"})

        lottery_params = {}

        for task in task_list:
            task_name = task['name']
            finish_count = task.get('finishCount', 0)
            total_count = task.get('totalCount', 0)
            if not finish_count:
                finish_count = 0

            if '骰子抽奖' not in task_name and finish_count >= total_count:
                continue

            if '下单' in task_name:
                continue

            if '骰子抽奖' in task_name:
                lottery_params = deepcopy(shop)
                lottery_params['taskId'] = task['id']
                lottery_params['token'] = task['token']
                lottery_params['opType'] = 2
                continue

            if '分享任务' in task_name:
                share_params = deepcopy(shop)
                share_params['taskId'] = task['id']
                share_params['token'] = task['token']
                share_params['opType'] = 2
                code_val = json.dumps(share_params)
                code_key = CODE_KEY_BASE + shop['shopId']
                Code.insert_code(code_key=code_key, code_val=code_val, account=self.account, sort=self.sort)
                println('{}, 店铺:{}助力参数:{}'.format(self.account, shop_name, code_val))
                self.code_key_list.append(code_key)
                continue

            println('{}, 正在进行店铺:《{}》的任务:《{}》!'.format(self.account, shop_name, task_name))
            if '逛店铺' in task_name:
                await self.do_task(session, shop, task)
            if '热爱环游记' in task_name:
                await self.do_task(session, shop, task)
            if '加购商品' in task_name or '看看好物' in task_name:
                params = deepcopy(shop)
                params['taskId'] = task['id']
                res = await self.requestx(session, 'jm_goods_taskGoods', params)
                sku_list = res.get('skuList', list())
                for sku in sku_list:
                    p = deepcopy(params)
                    p['opType'] = 2
                    p['token'] = task['token']
                    p['referSource'] = sku['skuId']
                    res = await self.requestx(session, 'jm_task_process', p)
                    if res:
                        println('{}, 加购:《{}》, 获得奖励:{}'.format(self.account, sku['name'],
                                                              res.get('awardVO', dict()).get('name', '未知')))
                    await asyncio.sleep(1)

        if lottery_params:
            for i in range(20):
                res = await self.requestx(session, 'jm_task_process', lottery_params)
                if not res:
                    break
                println('{}, 店铺:{}, 抽奖一次, 获得奖励:{}'.format(self.account, shop_name, res.get('awardVO', dict()).get('name', '未知')))
                await asyncio.sleep(1)

    async def run(self):
        """
        :return:
        """
        async with aiohttp.ClientSession(headers=self.headers, cookies=self.cookies) as session:
            shop_list = await self.get_shop_list(session)
            for shop in shop_list:
                data = await self.request(session, 'jm_promotion_queryPromotionInfoByShopId',
                                          {"shopId": shop['shopId'], "channel": 20})
                wx_url = data.get('wxUrl', None)
                if not wx_url:
                    continue
                url = furl(wx_url)
                appid = url.args.get('appId', None)
                if not appid:
                    continue
                shop['miniAppId'] = appid
                await self.do_shop_tasks(session, shop)

            # if self.code_key_list:
            #     for code in self.code_key_list:
            #         Code.post_code_list(code)

    async def run_help(self):
        async with aiohttp.ClientSession(headers=self.headers, cookies=self.cookies) as session:
            shop_list = await self.get_shop_list(session)
            for shop in shop_list:
                code_key = CODE_KEY_BASE + shop['shopId']
                item_list = Code.get_code_list(code_key)
                for item in item_list:
                    account, code = item.get('account'), item.get('code')
                    res = await self.requestx(session, 'jm_task_process', json.loads(code))
                    if not res:
                        break
                    println('{}, 成功助力好友:{}'.format(self.account, account))
                    await asyncio.sleep(1)


if __name__ == '__main__':
    # from config import JD_COOKIES
    # app = JdTravelShopTask(**JD_COOKIES[-1])
    # asyncio.run(app.run_help())
    from utils.process import process_start
    process_start(JdTravelShopTask, '热爱环游记-逛店铺抽金币', help=False)
