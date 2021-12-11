#!/usr/local/bin/python
# -*- coding: utf-8 -*-
# @Time    : 2021/10/20 10:55 上午
# @File    : jd_travels.py
# @Project : scripts
# @Cron    : 39 */3 * * *
# @Desc    : 热爱环游记
import asyncio
import json
import aiohttp
from urllib.parse import urlencode, quote
from config import USER_AGENT
from utils.browser import open_browser, open_page, close_browser
from utils.jd_init import jd_init
from utils.console import println
from utils.logger import logger
from db.model import Code

CODE_KEY = 'jd_travels'
GROUP_CODE_KEY = 'jd_travels_group'


@jd_init
class JdTravels:
    page = None

    browser = None

    browser_cookies = None

    secretp = None

    headers = {
        'user-agent': 'jdapp;Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, '
                      'like Gecko) Version/13.0.4 Mobile/15E148 Safari/604.1',
        'referer': 'https://wbbny.m.jd.com/',
    }

    url = 'https://wbbny.m.jd.com/babelDiy/Zeus/2vVU4E7JLH9gKYfLQ5EVW6eN2P7B/index.html'

    async def run(self):
        """
        程序入口
        """
        println('{}, 正在打开浏览器...'.format(self.account))
        try:
            self.browser_cookies = [
                {
                    'domain': '.jd.com',
                    'name': 'pt_pin',
                    'value': self.cookies.get('pt_pin'),
                },
                {
                    'domain': '.jd.com',
                    'name': 'pt_key',
                    'value': self.cookies.get('pt_key'),
                }
            ]
            self.browser = await open_browser()
            self.page = await open_page(self.browser, self.url, USER_AGENT, self.browser_cookies)
        except Exception as e:
            println('{}, 程序出错:{}!'.format(self.account, e.args))

        if not self.browser:
            println('{}, 无法打开浏览器, 退出程序!'.format(self.account))
            return

        if not self.page:
            println('{}, 无法打开页面, 退出程序!'.format(self.account))
            if self.browser:
                await self.browser.close()
            return

        cookies = await self.get_cookies()
        if not cookies:
            println('{}, 获取cookies失败, 退出程序!')
            return

        async with aiohttp.ClientSession(headers=self.headers, cookies=self.cookies) as session:
            data = await self.request(session, 'travel_getHomeData')
            self.secretp = data.get('result', dict()).get('homeMainInfo', dict()).get('secretp', None)
            if not self.secretp:
                println('{}, 获取secretp失败, 退出程序!'.format(self.account))
                return
            await self.travel_sign(session)
            await self.collect_auto_score(session)
            await self.do_feed_tasks(session)
            println('{}, 开始循环10次任务...'.format(self.account))
            for i in range(10):
                await self.do_tasks(session)
            println('{}, 任务已完成...'.format(self.account))
            await self.travel_raise(session)
            await self.get_group_id(session)
            await self.get_pk_award(session)

        if self.browser:
            await close_browser(self.browser)

    async def travel_sign(self, session):
        """"
        签到
        """
        res = await self.request(session, 'travel_getSignHomeData')
        if res.get('bizCode', -1) != 0:
            println('{}, 无法获取签到数据！'.format(self.account))
            return
        is_sign = res.get('result', dict()).get('todayStatus', 0)
        if is_sign == 1:
            println('{}, 今日已签到！'.format(self.account))
            return
        res = await self.request(session, 'travel_sign', is_ss=True)
        println('{}, 签到结果：{}'.format(self.account, res))

    async def travel_raise(self, session, max_times=20):
        """
        打卡
        :return:
        """
        for i in range(max_times):
            res = await self.request(session, 'travel_raise', is_ss=True)
            if res.get('bizCode', 999) == 0:
                println('{}, 成功打卡一次!'.format(self.account))
            else:
                println('{}, 打卡失败, {}'.format(self.account, res))
                break
            await asyncio.sleep(1)

    async def run_help(self):
        """
        :return:
        """
        println('{}, 正在打开浏览器...'.format(self.account))
        try:
            self.browser_cookies = [
                {
                    'domain': '.jd.com',
                    'name': 'pt_pin',
                    'value': self.cookies.get('pt_pin'),
                },
                {
                    'domain': '.jd.com',
                    'name': 'pt_key',
                    'value': self.cookies.get('pt_key'),
                }
            ]
            self.browser = await open_browser()
            self.page = await open_page(self.browser, self.url, USER_AGENT, self.browser_cookies)
        except Exception as e:
            println('{}, 程序出错:{}!'.format(self.account, e.args))

        if not self.browser:
            println('{}, 无法打开浏览器, 退出程序!'.format(self.account))
            return

        if not self.page:
            println('{}, 无法打开页面, 退出程序!'.format(self.account))
            if self.browser:
                await self.browser.close()
            return

        cookies = await self.get_cookies()
        if not cookies:
            println('{}, 获取cookies失败, 退出程序!')
            return

        async with aiohttp.ClientSession(headers=self.headers, cookies=self.cookies) as session:
            data = await self.request(session, 'travel_getHomeData')
            self.secretp = data.get('result', dict()).get('homeMainInfo', dict()).get('secretp', None)
            if not self.secretp:
                println('{}, 获取secretp失败, 退出程序!'.format(self.account))
                return
            item_list = Code.get_code_list(CODE_KEY)
            if self.sort < 1:
                for item in item_list:
                    if item['account'] == '作者':
                        item_list.remove(item)
                        item_list.insert(0, item)

            for item in item_list:
                account, code = item.get('account'), item.get('code')
                res = await self.request(session, 'travel_collectScore', {'inviteId': code}, is_ss=True)
                println('{}, 助力:{}, 结果:{}'.format(self.account, account, res))
                await asyncio.sleep(1)
                if res.get('bizCode') == 106:
                    break

            item_list = Code.get_code_list(GROUP_CODE_KEY)
            if self.sort < 1:
                for item in item_list:
                    if item['account'] == '作者':
                        item_list.remove(item)
                        item_list.insert(0, item)

            for item in item_list:
                account, code = item.get('account'), item.get('code')
                res = await self.request(session, 'travel_pk_joinGroup', {
                    "inviteId": code, "confirmFlag": "1"
                }, is_ss=True)
                println('{}, 加入好友:{}的组, 结果:{}'.format(self.account, account, res))
                await asyncio.sleep(2)
                if res.get('bizCode') == -2:
                    break

        if self.browser:
            await close_browser(self.browser)

    @logger.catch
    async def do_tasks(self, session):
        """
        做任务
        :param member_done:
        :param session:
        :return:
        """
        res = await self.request(session, 'travel_getTaskDetail')
        if res.get('bizCode') != 0:
            println('{}, 获取任务失败！'.format(self.account))
            return
        try:
            invite_id = res['result']['inviteId']
            println('{}, 邀请码:{}'.format(self.account, invite_id))
            Code.insert_code(code_key=CODE_KEY, code_val=invite_id, sort=self.sort, account=self.account)
        except Exception as e:
            pass
        award_list = res['result']['lotteryTaskVos'][0]['badgeAwardVos']
        task_list = res['result']['taskVos']

        for award in award_list:
            if award['status'] == 3:
                res = await self.request(session, 'travel_getBadgeAward', {
                    'awardToken': award['awardToken']
                })
                if res.get('bizCode', 999) == 0:
                    println('{}, 成功领取奖励, {}'.format(self.account, res.get('result', '')))

        for task in task_list:
            timeout = task.get('waitDuration', 8)
            if timeout < 1:
                timeout = 1
            times = task.get('times', 1)
            max_times = task.get('maxTimes', 6)
            task_id = task['taskId']
            println('{}, 任务:{}, 进度:{}/{}'.format(self.account, task['taskName'], times, max_times))

            if times >= max_times:
                continue

            if task_id == 1:
                continue
            if '下单' in task['taskName']:
                continue
            if 'shoppingActivityVos' in task:
                item_list = task['shoppingActivityVos']
            elif 'browseShopVo' in task:
                item_list = task['browseShopVo']
            elif 'brandMemberVos' in task: # 跳过入会
                continue
                # item_list = task['brandMemberVos']
            elif 'simpleRecordInfoVo' in task:
                item_list = [task['simpleRecordInfoVo']]
            else:
                println(task)
                item_list = []

            if task_id in [16, 17, 22] or len(item_list) < 1:
                res = await self.request(session, 'travel_getFeedDetail', {
                    "taskId": str(task_id)
                })
                if res.get('bizCode', -1) == 0:
                    println(res)
                    if 'addProductVos' in res['result']:
                        item_list = res['result']['addProductVos'][0]['productInfoVos']
                    elif 'taskVos' in res['result']:
                        if 'browseShopVo' in res['result']['taskVos'][0]:
                            item_list = res['result']['taskVos'][0]['browseShopVo']
                    else:
                        println(res)

            c = 0
            for item in item_list:
                body = {
                    'taskId': str(task_id),
                    'taskToken': item['taskToken'],
                    'actionType': 1
                }
                res = await self.request(session, 'travel_collectScore', body, is_ss=True)
                println(res)
                await asyncio.sleep(1)
                c += 1
                if c > max_times:
                    break

            println('{}, {}秒后开始领取奖励!'.format(self.account, timeout))
            await asyncio.sleep(timeout)

            c = 0
            for item in item_list:
                body = {
                    'taskId': str(task_id),
                    'taskToken': item['taskToken'],
                    'actionType': 0
                }
                res = await self.request(session, 'travel_collectScore', body, is_ss=True)
                println(res)
                if res.get('bizCode', -1) in [103, 104]:
                    break
                await asyncio.sleep(1)
                c += 1
                if c >= max_times:
                    break

    async def get_group_id(self, session):
        """
        获取组ID
        """
        res = await self.request(session, 'travel_pk_getHomeData')
        if res.get('bizCode') != 0:
            println('{}, 无法获取组ID!'.format(self.account))
            return
        group_id = res.get('result', dict()).get('groupInfo', dict()).get('groupJoinInviteId', None)
        if group_id:
            println('{}, 组ID：{}'.format(self.account, group_id))
            Code.insert_code(code_key=GROUP_CODE_KEY, account=self.account, sort=self.sort, code_val=group_id)


    async def do_feed_tasks(self, session):
        """
        做任务
        :param session:
        :return:
        """
        data = await self.request(session, 'travel_getFeedDetail')
        if data.get('bizCode', -1) != 0:
            println('{}, 获取任务列表失败!'.format(self.account))
            return

        task_vos = data.get('result', dict()).get('taskVos', list())

        for task_dict in task_vos:
            println(task_dict['taskId'])
            cur_times = task_dict.get('times', 0)
            max_times = task_dict.get('maxTimes', 24)
            task_name = task_dict.get('taskName', '未知')
            task_id = task_dict['taskId']
            timeout = task_dict.get('waitDuration', 5)
            println('{}, 任务:《{}》, 进度:{}/{}!'.format(self.account, task_name, cur_times, max_times))
            if cur_times >= max_times:
                continue
            if 'browseShopVo' in task_dict:
                c = 0
                browse_tasks = task_dict['browseShopVo']
                println('{}, 正在执行任务...'.format(self.account))
                for task in browse_tasks:
                    body = {
                        'taskId': str(task_id),
                        'taskToken': task['taskToken'],
                        'actionType': 1
                    }
                    await self.request(session, 'travel_collectScore', body, is_ss=True)
                    await asyncio.sleep(1)
                    c += 1
                    if c > max_times:
                        break

                println('{}, {}秒后开始领取奖励!'.format(self.account, timeout))

                c = 0
                for task in browse_tasks:
                    body = {
                        'taskId': str(task_id),
                        'taskToken': task['taskToken'],
                        'actionType': 0
                    }
                    res = await self.request(session, 'travel_collectScore', body, is_ss=True)
                    println('{}, {}, 结果:{}'.format(self.account, task['shopName'], res.get('bizMsg', '未知')))
                    await asyncio.sleep(1)
                    c += 1
                    if c > max_times:
                        break

    @logger.catch
    async def collect_auto_score(self, session):
        """
        收金币
        :param session:
        :return:
        """
        data = await self.request(session, 'travel_collectAtuoScore', is_ss=True)
        if data.get('bizCode', -1) == 0:
            println('{}, 成功收取金币:{}!'.format(self.account, data.get('result', dict).get('produceScore')))
        else:
            println('{}, 收取金币失败!'.format(self.account))

    @logger.catch
    async def get_cookies(self):
        """
        获取拼图验证后的cookies
        :return:
        """
        result_cookies = dict()
        cookies = await self.page.cookies()
        if not cookies:
            return None
        for cookie in cookies:
            result_cookies[cookie['name']] = cookie['value']
        return result_cookies

    @logger.catch
    async def request(self, session, function_id, body=None, method='POST', is_ss=False):
        try:
            if body is None:
                body = {}

            if is_ss:
                ss = await self.get_ss()
                body['ss'] = json.dumps(ss)

            params = {
                'functionId': function_id,
                'body': json.dumps(body),
                'client': 'wh5',
                'clientVersion': '1.0.0'
            }
            url = 'https://api.m.jd.com/client.action?' + urlencode(params)
            if method == 'POST':
                response = await session.post(url=url)
            else:
                response = await session.get(url=url)
            text = await response.text()
            data = json.loads(text)
            if data['code'] != 0:
                return data
            return data['data']
        except Exception as e:
            println('{}, 获取数据失败, {}!'.format(self.account, e.args))
            return {
                'bizCode': 999,
                'bizMsg': '无法获取服务器数据!'
            }

    @logger.catch
    async def get_pk_award(self, session):
        """
        pk领奖
        """
        import datetime
        if datetime.datetime.now().hour >= 20:
            res = await self.request(session, 'travel_pk_divideScores', is_ss=True)
            println('{}, 组队PK领奖结果:{}'.format(self.account, res))

    @logger.catch
    async def get_ss(self):
        """
        获取验证参数
        """
        try:
            data = await self.page.evaluate(('''() => {
                                window.smashUtils.init({"appid": "50089","sceneid": 'HYJhPageh5', 'uid': '1EFRTxA'})
                                const DATA = {appid:'50089',sceneid:'HYJhPageh5'};
                                var t = Math.floor(1e7 + 9e7 * Math.random()).toString();
                                var e = window.smashUtils.get_risk_result({id: t,data: {random: t}}).log;
                                var o = JSON.stringify({extraData: {log:  e || -1, sceneid: DATA.sceneid,},random: t});
                                return o;
                                }'''))
            data = json.loads(data)
            data['secretp'] = self.secretp
            return data
        except Exception as e:
            println(e.args)


if __name__ == '__main__':
    # from config import JD_COOKIES
    # app = JdTravels(**JD_COOKIES[0])
    # asyncio.run(app.run())
    from utils.process import process_start
    process_start(JdTravels, name='热爱环游记', process_num=1, code_key=[CODE_KEY, GROUP_CODE_KEY], help=True)
