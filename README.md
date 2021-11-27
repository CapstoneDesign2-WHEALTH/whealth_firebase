# whealth_firebase
ios 버전 세팅하는 방법

# 초반 세팅
npm install -g react-native-cli

yarn add @react-native-firebase/app
yarn add @react-native-firebase/database

rebuild the ios app (pod install)



# 파이어베이스 프로젝트에서 ios 앱 생성 (첫번째 방법)
1) GoogleService-Info.plist 다운로드 : Xcode 프로젝트의 루트로 이동하여 대상 전체에 plist 파일 추가
2) Firebase SDK 추가 : ?????
3) 초기화 코드 추가 : ?????

(파이어베이스 사이트에 sdk 안내문에 나온 내용)



# 파이어베이스 프로젝트에서 ios 앱 생성 (두번째 방법)
1) GoogleService-Info.plist 다운로드 : Xcode 프로젝트의 루트로 이동하여 대상 전체에 plist 파일 추가
2) ios/{projectName}/AppDelegate.m 파일을 열어서 맨 위에 #import <Firebase.h> 라인 추가
3) - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions { 
  if ([FIRApp defaultApp] == nil) {
    [FIRApp configure]; 
  같은 파일에 위 라인들 추가
4) rebuild ios app (pod install)

(https://blog.jscrambler.com/integrating-firebase-with-react-native 에 나온 내용)
