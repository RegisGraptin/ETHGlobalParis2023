//
//  KeyManager.swift
//  FloraVerifier
//
//  Created by Alok Sahay on 23.07.2023.
//

import Foundation

class PrivateKeyManager {
    let data: Data
    
    init(data: Data) {
        self.data = data
    }
}

class KeyManager {
    let data: Data
    
    init(data: Data) {
        self.data = data
    }
    
   static func generate(privateKeyString: String) throws -> KeyManager {
        // Convert the private key string to Data
        guard let privateKeyData = Data(hex: privateKeyString) else {
            throw NSError(domain: "InvalidPrivateKey", code: 0, userInfo: [NSLocalizedDescriptionKey: "Invalid private key format."])
        }
        return KeyManager(data: privateKeyData)
    }
    
    static func getKey() -> String? {
        guard let plistPath = Bundle.main.path(forResource: "Config", ofType: "plist") else {
            return nil
        }
        
        guard let plistDict = NSDictionary(contentsOfFile: plistPath) as? [String: Any] else {
                return nil // Failed to parse the plist
        }
        
        if let getKey = plistDict["UseKey"] as? String {
            return getKey
        } else {
            return nil
        }
    }
    
    static func getAddress() -> String? {
        guard let plistPath = Bundle.main.path(forResource: "Config", ofType: "plist") else {
            return nil
        }
        
        guard let plistDict = NSDictionary(contentsOfFile: plistPath) as? [String: Any] else {
                return nil // Failed to parse the plist
        }
        
        if let getKey = plistDict["AttestationAddress"] as? String {
            return getKey
        } else {
            return nil
        }
    }
    
    static func getProjectKey() -> String? {
        guard let plistPath = Bundle.main.path(forResource: "Config", ofType: "plist") else {
            return nil
        }
        
        guard let plistDict = NSDictionary(contentsOfFile: plistPath) as? [String: Any] else {
                return nil // Failed to parse the plist
        }
        
        if let getKey = plistDict["ProjectId"] as? String {
            return getKey
        } else {
            return nil
        }
    }
}


