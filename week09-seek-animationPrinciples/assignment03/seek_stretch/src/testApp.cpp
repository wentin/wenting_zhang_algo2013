#include "testApp.h"

//--------------------------------------------------------------
void testApp::setup(){
    ofSeedRandom();
    
    
    dest1 = ofVec2f( ofRandomWidth(), ofRandomHeight() );
    dest2 = ofVec2f( ofRandomWidth(), ofRandomHeight() );
    
    car1.setParams( ofGetWindowSize() / 2, ofVec2f(10, -5) );
    car2.setParams( ofGetWindowSize() / 2, ofVec2f(10, 5) );
    
    car1.color = ofColor(0,255,0);
    car2.color = ofColor(0,0,255);
    
    ofBackground(255);
    
    ofEnableAlphaBlending();
}

//--------------------------------------------------------------
void testApp::update(){
    
    // apply steering force
    car1.seek( dest1 );
    car2.seek( dest2 );
    
    // apply repelling force
    if( car1.pos.distance( car2.pos ) < 200 ){
        car1.color = ofColor(255,0,0);
        car2.color = ofColor(255,0,0);
        
        car1.addRepulsionForce( car2.pos );
        car2.addRepulsionForce( car1.pos );
    }else{
        car1.color = ofColor(0,255,0);
        car2.color = ofColor(0,0,255);
    }
    
    // update physics
    car1.update();
    car2.update();
    
    if( car1.pos.distance(dest1) < 5){
        dest1 = ofVec2f( ofRandomWidth(), ofRandomHeight() );
    }
    
    if( car2.pos.distance(dest2) < 5){
        dest2 = ofVec2f( ofRandomWidth(), ofRandomHeight() );
    }
}

//--------------------------------------------------------------
void testApp::draw(){
    
    ofSetColor( car1.color );
    ofCircle( dest1, 4 );
    car1.draw();
    
    ofSetColor( car2.color );
    ofCircle( dest2, 4 );
    car2.draw();
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
