from openvino.runtime import Core
import numpy as np

# Initialize the OpenVINO runtime Core
ie = Core()

# Load and compile the model for the CPU device
compiled_model = ie.compile_model(model='../ovc_output/converted_model.xml', device_name="CPU")

# Prepare input: assuming the input_ids is an integer array of token IDs
#input_ids = np.random.randint(0, 50256, (1, 10))
input_ids = "Could the understated effects of theobromine in coffee be responsible for putative serotonergic effects of coffee but not caffeine?"

# Create a dictionary for the inputs expected by the model
inputs = {"input_ids": input_ids}

# Create an infer request and start synchronous inference
result = compiled_model.create_infer_request().infer(inputs=inputs)

# Access output tensor data directly from the result using the appropriate output key
# Replace 'outputs' with the actual name of your output tensor if it's different
output = result['outputs']

print("Inference results:", output)
