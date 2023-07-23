//
//  ViewController.swift
//  FloraVerifier
//
//  Created by Alok Sahay on 22.07.2023.
//

import UIKit
import WalletConnectModal
import Starscream
import XMTP

class ViewController: UIViewController {
    
    @IBOutlet weak var textView: UITextView!
    @IBOutlet weak var applicationView: UIView!
    
    var xmtpMessages: [String] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupModal()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        showModal()
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 5.0) {
            self.loadMessages()
        }
    }
    
    func setupModal() {
        let metadata = AppMetadata(
            name: "Flora Verifier",
            description: "Flora Verification",
            url: "example.wallet",
            icons: ["https://avatars.githubusercontent.com/u/37784886"]
        )
        
        WalletConnectModal.configure(
            projectId: KeyManager.getProjectKey()!,
            metadata: metadata
        )
        
        let socket = SocketFactory()
        Networking.configure(projectId: KeyManager.getProjectKey()!, socketFactory: socket)
    }
    
    func showModal() {
        WalletConnectModal.present()
    }
    
    func loadMessages() {
        
        let privateKeyString = KeyManager.getKey()!
        
        do {
            let keyData = try KeyManager.generate(privateKeyString: privateKeyString)
            let account = try PrivateKey(keyData.data)
            
            Task {
                let client = try await Client.create(account: account)
                let conversation = try await client.conversations.newConversation(
                    with: KeyManager.getAddress()!)
                let messages = try await conversation.messages()
                
                for message in messages {
                    do {
                        let messageText: String = try message.encodedContent.decoded()
                        xmtpMessages.append(messageText)
                        updateChat()
                    } catch {
                        print(error)
                    }
                }
            }
        } catch {
            print("Error occurred: \(error)")
        }
    }
    
    func updateChat() {
        let text = xmtpMessages.reversed().joined(separator: "\n")
        textView.text = "⌐◨-◨\n" + text
        applicationView.isHidden = false
    }
}

extension WebSocket: WebSocketConnecting {}

struct SocketFactory: WebSocketFactory {
    func create(with url: URL) -> WebSocketConnecting {
        return WebSocket(url: url)
    }
}
