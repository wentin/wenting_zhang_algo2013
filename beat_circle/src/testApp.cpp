#include "testApp.h"

//--------------------------------------------------------------
void testApp::setup(){
    count = 150;
    ofSetBackgroundAuto(false);
    //ofEnableAlphaBlending();
    ofEnableBlendMode(OF_BLENDMODE_ALPHA);
    ofBackground(0);
    k = 0;
    beat.loadSound("sounds/sharp-little-guy.mp3");
    beat.play();
	fftSmoothed = new float[8192];
	for (int i = 0; i < 8192; i++){
		fftSmoothed[i] = 0;
	}
	
	nBandsToGet = 128;
    colorCode = 0;
}

//--------------------------------------------------------------
void testApp::update(){
	ofSoundUpdate();
    float * val = ofSoundGetSpectrum(nBandsToGet);
    for (int i = 0;i < nBandsToGet; i++){
		
		// let the smoothed calue sink to zero:
		fftSmoothed[i] *= 0.96f;
		
		// take the max, either the smoothed or the incoming:
		if (fftSmoothed[i] < val[i]) fftSmoothed[i] = val[i];
		
	}
}

//--------------------------------------------------------------
void testApp::draw(){
    //ofEnableBlendMode(OF_BLENDMODE_ALPHA);
    ofSetColor(0,0,0,12);
    ofRect( ofGetWindowRect() );
    
    float beat = 0;
    for (int i = 0;i < nBandsToGet; i++){
		beat += fftSmoothed[i];
	}
    cout << fftSmoothed[0] << endl;
    
    float faderX = 1 - (float)beat/32.0;
    //faderX *= faderX;
    faderX *= (float)mouseX/ofGetWindowWidth();
    faderX = sqrt (faderX);
    faderX = 2-faderX;
    //float faderX = 1 - (float)fftSmoothed[0]/9.0;
    //float faderX = (float)mouseX/ofGetWindowWidth();
    float angle = ofDegToRad(360/float(count));
    
    for (int i=0; i<count; i++){
        // positions
        float randomX = ofRandom(0,ofGetWindowWidth());
        float randomY = ofRandom(0,ofGetWindowHeight());
        float circleX = ofGetWindowWidth()/2 + cos(angle*i)*300;
        float circleY = ofGetWindowHeight()/2 + sin(angle*i)*300;
        
        float x = ofLerp(randomX,circleX, faderX);
        float y = ofLerp(randomY,circleY, faderX);
        if (colorCode < 1){
            color.setHsb(130, 255, 255);
        } else if (colorCode < 3 && colorCode > 1) {
            color.setHsb(k%255, 255, 255);
            //color.setHsb(k%255, i*255/150, 255);
        } else {
            color.setHsb(k%255, 255-x*255/ofGetWindowWidth(), 255-y*255/ofGetWindowHeight());
        }
        //
        
        ofSetColor(color);
        ofCircle(x, y, 5);
    }
    k++;

}

//--------------------------------------------------------------
void testApp::keyPressed(int key){
    if(key == '1') {
        colorCode = 0;
    } else if(key == '2') {
        colorCode = 2;
    } else if(key == '3') {
        colorCode = 4;
    }

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
