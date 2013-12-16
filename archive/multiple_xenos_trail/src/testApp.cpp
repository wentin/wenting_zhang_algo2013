#include "testApp.h"

//--------------------------------------------------------------
void testApp::setup(){
    //myRectangle.setup(10, 10, 0, 0,  ofColor(255, 255, 0));
    //myQueueRectangle.setup();
    ofBackground(0,0,0);
    ofSetFrameRate(20);
    myQueue.setup();
}

//--------------------------------------------------------------
void testApp::update(){
    //myRectangle.update();
    //myQueueRectangle.update();
}

//--------------------------------------------------------------
void testApp::draw(){
    //myRectangle.draw();
    //myQueueRectangle.draw();
    myQueue.draw();
}

//--------------------------------------------------------------
void testApp::keyPressed(int key){

}

//--------------------------------------------------------------
void testApp::keyReleased(int key){

}

//--------------------------------------------------------------
void testApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void testApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void testApp::mousePressed(int x, int y, int button){
}

//--------------------------------------------------------------
void testApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void testApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void testApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void testApp::dragEvent(ofDragInfo dragInfo){

}
