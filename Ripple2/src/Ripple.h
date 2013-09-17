//
//  Ripple.h
//  ripple
//
//  Created by Wenting Zhang on 9/16/13.
//
//

#ifndef __ripple__Ripple__
#define __ripple__Ripple__

#include <iostream>
#include "ofMain.h"
#define TOTAL_NUMBER 14

class ripple{
public:
    ripple();
    void setup();
    void draw();
    void update();
    
    float radius;
  
    void mouseMoved(ofMouseEventArgs & args);
    void mouseDragged(ofMouseEventArgs & args);
    void mousePressed(ofMouseEventArgs & args);
    void mouseReleased(ofMouseEventArgs & args);
  
    float radiusSet [TOTAL_NUMBER];
    float radiusTargetSet [TOTAL_NUMBER];
    
    ofPoint pos;
};

#endif /* defined(__ripple__Ripple__) */
