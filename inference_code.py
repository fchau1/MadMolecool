from openvino.runtime import Core
import torch

ie = Core()
net = ie.read_network(model='../ovc_output/converted_model.xml', weights='../ovc_output/converted_model.bin')
exec_net = ie.load_network(network=net, device_name="CPU")

# Prepare input
input_ids = torch.randint(0, 50256, (1, 10)).numpy()
inputs = {"input_ids": input_ids}

# Run inference
results = exec_net.infer(inputs=inputs)
output = results['outputs']

print("Inference results:", output)