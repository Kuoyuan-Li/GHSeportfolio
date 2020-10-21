# -*- coding: utf-8 -*-
import unittest
import os
import sys
sys.path.append(os.path.abspath(".."))
sys.path.append(os.path.abspath(".."))
from app.routes import client,db
from app.models import User, Section, Module
import uuid
import json

class TestLogin(unittest.TestCase):

    """在执行具体的测试方法前，先被调用"""
    def setUp(self):
        self.client = client

    def convert_to_json(self,table):
        data = [row.convert_to_dict() for row in table]
        json = {"list": data}
        return json

    """测试登录接口"""
    # def test_login(self):
    #     """测试模拟场景，用户名或密码不完整"""
        #
        # #1、测试不正确的情况
        # data = json.dumps({"username":"11","password":11})
        # response = self.client.post("/login", data=data,content_type='application/json')
        # resp_json = response.data
        # resp_dict = json.loads(resp_json)
        # self.assertEqual({"validity": False,
        #                 "nonValidMessage": "Invalid username or password"}, resp_dict)

        # #2、测试正确的情况
        # username = "user3"
        # password = "pwd1"
        # data = json.dumps({"username": username, "password": password})
        # user = User.query.filter_by(username=username).first()
        # response = self.client.post("/login", data=data, content_type='application/json')
        # resp_json = response.data
        # resp_dict = json.loads(resp_json)
        # self.assertEqual({"validity": True,"user_id": user.user_id}, resp_dict)


    """测试注册接口"""
    # def test_register(self):
        # 1、测试不一致password和password1是否能上传成功
        # data = json.dumps({"username": "user1", "password": "pwd1","password2":"pwd2","email":"email1@163.com"})
        # 2、测试密码重复时
        # data = json.dumps({"username": "user2", "password": "pwd1", "password2": "pwd1", "email": "email2@163.com"})
        # #3、注册一个全新的用户，如果对了，返回{'nonValidMessage': '', 'validity': True}
        # data = json.dumps({"username": "user6", "password": "pwd1", "password2": "pwd1", "email": "email5@163.com"})
        # response = self.client.post("/register", data=data, content_type='application/json')
        # resp_json = response.data
        # resp_dict = json.loads(resp_json)
        # self.assertEqual({"validity": True,
        #             "nonValidMessage": ""}, resp_dict)
    #
    #
    #
    # def test_reset_password(self):
    #     user_id = 1
    #     password = "pwd2"
    #     password2 = "pwd2"
    #     data = json.dumps({"user_id":user_id,"password":password,"password2":password2})
    #     response = self.client.post("/resetPassword", data=data, content_type='application/json')
    #     resp_json = response.data
    #     resp_dict = json.loads(resp_json)
    #
    #     self.assertEqual({"validity": True, "nonValidMessage": ""},resp_dict)
    #
    #
    # def test_section_id(self):
    #     user_id = 2
    #     data = json.dumps({"user_id": user_id})
    #     sections = Section.query.filter_by(user_id=user_id).all()
    #     expect_json = self.convert_to_json(sections)
    #     response = self.client.post("/sectionIDs", data=data,content_type='application/json').data
    #     resp_dict = json.loads(response)
    #     self.assertEqual(expect_json, resp_dict)



    # def test_get_section(self):
    #     section_id = 2
    #     data = json.dumps({"section_id": section_id})
    #     response = self.client.post("/getSection", data=data,content_type='application/json').data
    #     response = json.loads(response)["list"]
    #     modules = Module.query.filter_by(section_id=section_id).all()
    #     self.assertEqual(modules,response)
    # #
    # save section
    # def test_save_section(self):
    #     section_id = 2
    #     section_title = "section_title"
    #     data = json.dumps({"section_id":section_id,"title":section_title})
    #     response = self.client.post("/saveSection", data=data, content_type='application/json').data
    #     response = json.loads(response)
    #     self.assertEqual({"message":"success"},response)

    #
    #添加section
    # def test_add_section(self):
    #     user_id = 1
    #     data = json.dumps({"user_id":user_id})
    #     resp_dict = self.client.post("/addSection", data=data, content_type='application/json').data
    #     resp_dict = json.loads(resp_dict)
    #     section = Section.query.filter_by(user_id=user_id)[-1]
    #     self.assertEqual({"success": True,
    #              "section_id": section.section_id}, resp_dict)

    #
    # #删除 section
    # def test_delete_section(self):
    #     section_id = 3
    #     data = json.dumps({"section_id": section_id})
    #     resp_dict = self.client.post("/deleteSection", data=data, content_type='application/json').data
    #     resp_dict = json.loads(resp_dict)
    #     self.assertEqual({"success": True}, resp_dict)
    #
    #
    # # 添加module
    # def test_add_module(self):
    #     section_id = 2
    #     data = json.dumps({"section_id":section_id})
    #     resp_dict = self.client.post("/addModule", data=data, content_type='application/json').data
    #     resp_dict = json.loads(resp_dict)
    #     title = "new module"
    #     module = Module.query.filter_by(section_id=section_id)
    #     new_module = Module.query.filter_by(module_id=module[-1].module_id).first()
    #     module_json = new_module.convert_to_dict()
    #     self.assertEqual({"success": True, "module": module_json}, resp_dict)
    #删除 module
    # def test_delete_module(self):
    #     module_id = 1
    #     data = json.dumps({"module_id":module_id})
    #     resp_dict = self.client.post("/deleteModule", data=data, content_type='application/json').data
    #     resp_dict = json.loads(resp_dict)
    #
    #     self.assertEqual({"success": True}, resp_dict)

    # # save module
    # def test_save_module(self):
    #     res = self.client.post('/saveModule', data={"imagename": "img1", "filename": "filename", "module_id": 2, "section_id": 2,
    #                               "title": "title", "time": "12:23:23", "text": "text",'file': open('abc.log', 'rb'), 'image': open('logo192.png', 'rb')}).data
    #     resp_dict = json.loads(res)
    #     self.assertEqual({"success": True}, resp_dict)

    # #save info
    # def test_save_info(self):
    #     res = self.client.post('/saveInformation',data={"imagename": "img1", "introduction": "introduction", "linkedin": "linkedin","contact_email":"melody@153.com","phone_number":11111,
    #                            "address":"Shandong","date_of_birth":"20:12:12", "gender":"nv","first_name":"melody","family_name":"zhou","user_id":2,"user_image":open('2020101915103149.png', 'rb')}).data
    #     print(res)
    #     resp_dict = json.loads(res)
    #     self.assertEqual({"success": True}, resp_dict)

    # def test_download_file(self):
    #     # ? 在前端是否控制了文件
    #     res = self.client.get('/downloadFile/test.txt').data
    #     a = "this is a file"
    #     self.assertEqual(a, res.decode("utf-8"))
    #
    # def test_download_image(self):
    #     # 写入发现图片是否一致
    #     res = self.client.get('/downloadImage/blue.jpg').data
    #     with open("../app/static/images/aa.jpg","wb") as f:
    #         f.write(res)


    # def test_download_video(self):
    #     # 写入发现图片是否一致
    #     res = self.client.get('/downloadVideo/2020101023124684.mp4').data
    #     with open("../app/static/videos/aa.mp4","wb") as f:
    #         f.write(res)

    # def test_download_audio(self):
    #     # 写入发现图片是否一致
    #     res = self.client.get('/downloadAudio/2020101023124661.mp3').data
    #     with open("../app/static/audios/aa.mp3","wb") as f:
    #         f.write(res)


    # def test_show_audio(self):
    #     # 写入发现图片是否一致
    #     res = self.client.get('/showAudio/2020101023124661.mp3').data
    #     audio_data = open("../app/static/audios/2020101023124661.mp3", "rb").read()
    #     self.assertEqual(audio_data, res)

    # def test_show_video(self):
    #     # 写入发现图片是否一致
    #     res = self.client.get('/showVideo/2020101023124684.mp4').data
    #     video_data = open("../app/static/videos/aa.mp4", "rb").read()
    #     self.assertEqual(video_data, res)


    # def test_show_image(self):
    #     # 写入发现图片是否一致
    #     res = self.client.get('/showImage/aa.jpg').data
    #     image_data = open("../app/static/images/aa.jpg", "rb").read()
    #     self.assertEqual(image_data, res)

    # #error
    # def test_show_info(self):
    #     # 写入发现图片是否一致
    #     user_id = 1
    #     res = self.client.post('/showInformation',data={"user_id":user_id}).data
    #     print(res)
    #     user = User.query.filter_by(user_id=user_id).first()
    #     print(user)
    #     expect = user.convert_to_dict()
    #     self.assertEqual(expect, res)

    def test_email(self):
        # """1. 写入email 为空的情况"""

        res = json.loads(self.client.post('/emailCaptcha', json={"email": " "}).data)
        expect = {"validity": False, "nonValidMessage": "Non-valid email address"}
        self.assertEqual(expect, res)

    #
        # #"""2. 写入email 不为空并且user表中有这个邮箱的情况"""
        # email = "email5@163.com"
        # user = User.query.filter_by(email=email).first()
        # res = json.loads(self.client.post('/emailCaptcha', json={"email": email}).data)
        # expect = {"nonValidMessage":"Please use another email address","validity": False}
        # self.assertEqual(expect, res)
    #
    #
        # """3. 写入email 不为空user表中没有这个邮箱 接口有问题？"""
 #        email = "GHSeportfolio@163.com"
 #        user = User.query.filter_by(email=email).first()
 #        res = json.loads(self.client.post('/emailCaptcha', json={"email": email}).data)
 #        print(res)
 #        captcha = str(uuid.uuid1())[:6]
 #        expect = {'captcha': captcha,
 # 'nonValidMessage': 'The verification code is successfully sent...',
 # 'validity': True}
 #        self.assertEqual(expect, res)





if __name__ == '__main__':
    unittest.main()