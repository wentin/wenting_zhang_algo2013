//
//  Particle.h
//  SingleParticle
//
//  Created by Charlie Whitney on 9/23/13.
//
//

#pragma once

#include "ofMain.h"

class Particle {
  public:
    Particle();
    
    void update();
    void draw();
    
    void setParams( ofVec2f _pos, ofVec2f _vel );
    void addForce( ofVec2f force );
    void seek( const ofVec2f &dest );
    void addRepulsionForce( const ofVec2f &fromPos );
    
    ofVec2f pos;
    ofVec2f vel;
    ofVec2f acc;
    
    ofVec2f damping;  // could also be a ofVec2f
    
    ofVec2f lastPos;
    
    float maxSpeed;
    float maxForce;
    float slowDownRadius;
    
    ofColor color;
};