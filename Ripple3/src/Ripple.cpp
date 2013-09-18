//
//  Ripple.cpp
//  Ripple3
//
//  Created by Wenting Zhang on 9/17/13.
//
//

#include "Ripple.h"

Ripple::Ripple(){
    ofSeedRandom();
    ofRegisterMouseEvents(this);
    ofSetColor(0, 255, 255, 150);
    ofNoFill();
    radius = 0;
    catchUpSpeed = 0.1f;
    pos.set(0, 0);
    for (int i = 0; i < TOTAL_NUMBER; i++) {
        radiusSet[i] = 0;
        radiusTargetSet[i] = 0;
    }
}

void Ripple::update(){
    
    radiusSet[0] = catchUpSpeed * radiusTargetSet[0] + (1-catchUpSpeed) * radiusSet[0];
    for (int i = 1; i < TOTAL_NUMBER; i++) {
        radiusTargetSet[i] = radiusSet[i-1];
        radiusSet[i] = catchUpSpeed * radiusTargetSet[i] + (1-catchUpSpeed) * radiusSet[i];
    }
}

void Ripple::draw(){
    
    for (int i = 0; i < TOTAL_NUMBER; i++) {
        ofCircle(pos.x, pos.y, radiusTargetSet[i]);
    }
}

void Ripple::mousePressed(ofMouseEventArgs & args)
{
    for (int i = 0; i < TOTAL_NUMBER; i++) {
        radiusSet[i] = 0;
        radiusTargetSet[i] = 0;
    }
    pos.set(args.x, args.y);
    radius = ofRandom(100.0, 200.0);
    radiusTargetSet[0] = radius;
}
void Ripple::mouseMoved(ofMouseEventArgs & args)
{
}
void Ripple::mouseDragged(ofMouseEventArgs & args)
{
}
void Ripple::mouseReleased(ofMouseEventArgs & args)
{
}